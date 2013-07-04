var WebSocket       = require("faye-websocket")
  , clientPool      = require("./clientPool")
  , uuid            = require("uuid")
  , Dispatch        = require("./dispatch")
  , color           = require("cli-color");

var JSTP = {
  theWebsockets: [],
  theTCPSockets: [],
  bound: [],
  transactionIDs: {},
  timeoutLapse: 10000,

  // API
  /////////////////////////////////////////////////
  dispatch: function (pack, callback, context) { 
    try {
      pack = new Dispatch(pack);

      var method = pack.method.toUpperCase();
      var flags = {
        fatal: {
          missingCallback: false,
          notAcceptable: false
        },
        answer: {
          subscription: false,
          process: false,
          noTriggersLeft: false
        },
        subscription: false,
        regular: false,
        bind: false,
        release: false
      }

      switch (method) {
        // Answer Morphology
        /////////////////////////////////////////////
        case "ANSWER":

          // Status Code: should be an Integer
          if (pack.resource[0] % 1 == 0) {
            flags.fatal.notAcceptable = true;
            break;
          }

          // Transaction ID: should be present
          if (!pack.resource[1]) {
            flags.fatal.notAcceptable = true;
            break;
          }

          // Triggering ID: should be present
          if (!pack.resource[2]) {
            flags.fatal.notAcceptable = true;
            break;            
          }

          // There should be some Triggering IDs assigned to this Transaction ID
          if (!this.transactionIDs[pack.resource[1]]) {
            flags.fatal.notAcceptable = true;
            break;
          }

          // The Transaction ID should be present in the list
          if (this.transactionIDs[pack.resource[1]].indexOf(pack.resource[2]) == -1) {
            flags.fatal.notAcceptable = true;
            break;
          }

          // Is it all right? Process the Answer
          flags.answer.process = true;
          break;

        // Subscription Morphology
        /////////////////////////////////////////////
        case "BIND":
          
          // If there is no callback, there's no business binding
          if (!callback) {
            flags.fatal.missingCallback = true;
            break;
          }

          // Notify that it is, in fact, a subscription
          flags.subscription = true;

          flags.bind = true;
          break;

        case "RELEASE":
          // Notify that it is, in fact, a subscription
          flags.subscription = true;

          flags.release = true;
          break;

        // Regular Morphology
        /////////////////////////////////////////////
        case "GET":
        case "POST":
        case "PATCH":
        case "DELETE":
        case "PUT":
          flags.regular = true;
          break;

        // Unrecognized method
        /////////////////////////////////////////////
        default:
          // Should Answer the 405 maybe
          throw new Error("405 Method Not Allowed: " + method.toUpperCase());
          break;
      }

      // The Callback is missing and is required?
      if (flags.fatal.missingCallback) 
        throw new Error("Missing Callback");

      // If not acceptable, not acceptable
      if (flags.fatal.notAcceptable) {
        // Answer with the code if there is a callback
        if (callback) {
          var answer = new Dispatch({
            method: "ANSWER",
            resource: [406, pack.token[0]],
            body: {
              message: "Not Acceptable",
              source: pack
            }
          });
          console.log(answer.toLog());
          return callback.call(context, this, answer);
        }

        // If there is no callback, there is no option but to throw the Exception
        else 
          throw new Error("406 Not Acceptable");
      }


      // It is not a Subscription? There is a callback?
      if (!flags.subscription && callback) {

        // Add Transaction ID if it is missing
        if (!pack.token[0]) pack.token = [uuid.v4()];        

        // BIND locally the ANSWER to the callback
        this.bind({ endpoint: {
          method: "ANSWER",
          resource: ["*", pack.token[0], "*"]
        }}, callback, context);        
      }

      // Is it a BIND ANSWER? Set timeout for involved Transaction ID
      if (flags.answer.subscription) {
        console.log(color.xterm(8)(this.timeoutLapse + "ms timeout for Transaction ID " + pack.endpoint.resource[1]));
        setTimeout( function () {
          JSTP._timeout(pack.endpoint.resource[1]);
        }, this.timeoutLapse);
      } 

      // Log the Dispatch if everything is OK
      console.log(pack.toLog());

      // If it is a BIND, lets _bind
      if (flags.bind)
        this._bind(pack, callback, context);

      // If it is a RELEASE, lets _release
      if (flags.release)
        this._release(pack, callback, context);

      // If the Dispatch has a Host, just forward it 
      if (pack.host && pack.host.length > 0)
        return this.forward(pack);

      // If Answer, remove the Triggering ID from the Transaction IDs collection
      if (flags.answer.process) {
        var index = this.transactionIDs[pack.resource[1]].indexOf(pack.resource[2]);
        this.transactionIDs[pack.resource[1]].splice(index, 1);
        if (this.transactionIDs[pack.resource[1]].length == 0)
          flags.answer.noTriggersLeft = true;
      }

      // If it got here, trigger the Endpoints for the Dispatch
      this._trigger(pack, context);

      // If answer, and no triggers left for the Subscription
      if (flags.answer.noTriggersLeft) {
        delete this.transactionIDs[pack.resource[0]];

        // Unbind the TransactionID
        this._unbindTransactionID(pack.resource[1]);
      }

    } catch(err) {
      console.log(err.message);
      console.log(err.stack);
    }
    return this;
  },

  answer: function (source, statusCode, body, callback, context) {
    var pack = {
      method: "ANSWER",
      resource: [statusCode, source.token[0], source.token[1]],
    }

    if (body) pack.body = body;
    this.dispatch(pack, callback, context);
    return this;
  },

  listen: function (options) {
    if (options.websocket)  this.httpServer(options.websocket);
    if (options.ws)         this.httpServer(options.ws);
    if (options.tcp)        this.tcpServer(options.tcp);
  },

  // Private
  /////////////////////////////////////////////////
  _bind: function (pack, callback, context) {
    for (i in this.bound) {
      if (
        this._compare(pack.endpoint, this.bound[i].endpoint.method, this.bound[i].endpoint.resource, true) &&
        this.bound[i].context   == context &&
        this.bound[i].callback  == callback
      )
        return console.log("Endpoint already bound for that emitter");
    }

    var host = [];
    if (pack.host && pack.host[0])
      host = pack.host[0]

    return this.bound.push({
      endpoint: pack.endpoint,
      callback: callback,
      context: context,
      host: host
    });
  },

  _release: function (pack, callback, context) {
    var newbound = []
    for (i in this.bound) {
      if (
        this._compare(
          pack.endpoint, this.bound[i].endpoint.method, 
          this.bound[i].endpoint.resource, true) &&
        this.bound[i].context  == context
      ) {
        console.log(color.xterm(208)("Unbinding " + this.bound[i].endpoint.method + " " + this.bound[i].endpoint.resource.join("/")));
      }
      else {
        newbound.push(this.bound[i]);
      }
    }
    this.bound = newbound;
  },

  _trigger: function (pack, context, synchronous) {
    var packMethod = pack.method.toLowerCase();
    var boundMethod;
    var endpoint;
    var index = 0;

    // Put all methods in an array, NOT CALL and after the array is formed
    // call all of them with async.parallel
    var callbacks = [];
    while (this.bound.length > index) {
      if (this.bound[index].context != context) {      
        endpoint = this.bound[index].endpoint;
        boundMethod = endpoint.method.toLowerCase();
        switch (packMethod) {
          case "bind":
          case "release":
            if (this._compare(endpoint, pack.method, pack.endpoint.resource)) {
              var callbackItem = this._callbackItem(
                this.bound[index].callback,
                this.bound[index].context,
                pack,
                this
              );
            }
            break;
          case "patch":
          case "put":
          case "get":
          case "post":
          case "delete":
            if (this._compare(endpoint, pack.method, pack.resource)) {
              var callbackItem = this._callbackItem(
                this.bound[index].callback,
                this.bound[index].context,
                pack,
                this
              );
            }
            break;
          case "answer":
            if (this._compare(endpoint, pack.method, pack.resource)) {
              var callbackItem = this._callbackItem(
                this.bound[index].callback,
                this.bound[index].context,
                pack,
                this,
                true
              );
            }
            break;
        }
      }        
      index++;      
    }
  },

  _callbackItem: function (callback, context, pack, engine, answer) {
    var item = {
      callback: callback,
      context: context, 
      pack: pack,
      engine: engine
    }
    if (pack.token[0]) {
      item.pack = this._assignTriggeringID(pack);
    }
    if (answer) {
      process.nextTick(function () {
        if (this.context) {
          this.callback.call(this.context, this.engine, this.pack);
        }
        else {
          this.callback(this.engine, this.pack);
        }
      }.bind(item));         
    }
    else {
      process.nextTick(function () {
        if (this.context) {
          this.callback.call(this.context, this.engine, null, this.pack);
        }
        else {
          this.callback(this.engine, null, this.pack);
        }
      }.bind(item));          
    }
    return item;
  },

  _assignTriggeringID: function (pack) {
    console.log("Is this ever done?");

    // Duplicate the Dispatch object
    var newPack = this._duplicateDispatch(pack);

    // Start array for token[0] in transactionIDs
    this.transactionIDs[newPack.token[0]] = this.transactionIDs[newPack.token[0]] || [];

    // Create the triggering ID token
    var triggeringID = uuid.v4();

    // Push the triggering ID to the transaction ID array
    this.transactionIDs[newPack.token[0]].push(triggeringID);

    // Push the triggering ID to the Token Header in the new Dispatch object
    newPack.token.push(triggeringID);

    // Return the new Dispatch object
    return newPack;
  },

  _duplicateDispatch: function (pack) {
    // Clone the object in a safe (although inefficient) way
    return JSON.parse(JSON.stringify(pack));
  },

  _timeout: function (transactionID) {

    // RELEASE the transaction ID if it is not present in the transactionIDs table
    if (!this.transactionIDs[transactionID]) {
      console.log("Should 50whatever the timeout!");

      // Unbind the transactionID
      this._unbindTransactionID(transactionID);

      console.log(this.bound);
    }

    // If it is present, lets log it for now
    else {
      console.log(transactionID);
      console.log(this.transactionIDs);
    }
  },

  _unbindTransactionID: function (transactionID) {
    // Build the RELEASE
    var release = new Dispatch({
      method: "RELEASE",
      endpoint: {
        method: "ANSWER",
        resource: ["*", transactionID, "*"]
      }
    });    

    // Manually send the RELEASE back to Inbound Subscriptions
    for (i in this.bound){
      if (this.bound[i].endpoint.method.toLowerCase() == "answer" &&
          this.bound[i].endpoint.resource[1] == transactionID) {
        if (this.bound[i].callback == JSTP._answer) {
          JSTP._answer.call(this.bound[i].context, this, null, release);
        }

        // Actually release 'em
        this.dispatch(release, this.bound[i].callback, this.bound[i].context);
      }
    }

  },

  _compare: function (endpoint, method, resource, strict) {
    method = method.toLowerCase();
    endpointMethod = endpoint.method.toLowerCase();
    if (strict) {
      if (method == endpointMethod && resource.length == endpoint.resource.length) {
        for (el in endpoint.resource) 
          if (endpoint.resource[el] != resource[el])
            return false;

        return true;
      } 
    }
    else {    
      if (
        (method == endpointMethod || endpointMethod == "*") && 
        (resource.length == endpoint.resource.length) 
      ) {
        for (el in endpoint.resource)
          if (
            endpoint.resource[el] != "*" && 
            endpoint.resource[el] != resource[el]) 
            return false;

        return true;
      }
    }
    return false;
  },

  _releaseOfClient: function (context) {
    var newbound = this.bound;

    for (index in newbound) {
      if (newbound[index].context == context) {
        var pack = {
          protocol: ["JSTP", "0.4"],
          method: 'RELEASE',
          endpoint: newbound[index].endpoint,
          timestamp: +new Date().getTime(),
          token: [],
          referer: ["JSTPEngine"]
        }
        this.dispatch(pack, newbound[index].callback, newbound[index].context);
      }
    }
  },

  _answer: function (engine, answer, dispatch) {
    var pack = dispatch;
    if (answer) pack = answer;

    if (isNaN(this.readyState)) {
      if (this.writable) {        
        console.log(color.xterm(24)("Sending dispatch back to client"));
        this.write(pack.toString() + "\n");
      }
      else console.log(color.xterm(208)("TCP client disconnected, dispatch not sent"));
    }
    else {
      if (this.readyState == 1) {
        console.log(color.xterm(24)("Sending dispatch back to client"));
        this.send(pack.toString());
      }
      else console.log(color.xterm(208)("Websocket client disconnected, dispatch not sent"));
    }
  },

  forward: function (pack) {
    // Identify the host type. Websocket in port 80 is default
    var address = ["", 80];
    var type    = "websocket";

    if (pack.host[0] instanceof String) 
      address = pack.host[0];
    else {
      address[0] = pack.host[0][0];
      address[1] = pack.host[0][1] || address[1];
      type       = pack.host[0][2] || type;
    }
    
    // First host out. If no hosts left, remove header
    pack.host.shift();
    if (pack.host.length == 0) delete pack.host;
    
    var stringPack = JSON.stringify(pack);
    var resource;
    var method;
    if (pack.endpoint) {
      method    = pack.method + " " + pack.endpoint.method;
      resource  = pack.endpoint.resource;
    }
    else {
      resource  = pack.resource;
      method    = pack.method;
    }

    console.log(color.xterm(60)("▶ " + address[0] + ":" + address[1] + ":" + type + " " + method + " " + resource.join("/")));

    clientPool[type](address, stringPack, JSTP);
  },

  // Servers
  /////////////////////////////////////////////////
  httpServer: function (httpServer) {
    httpServer.addListener('upgrade', function (request, socket, head) {
      JSTP.theWebsockets.push(new WebSocket(request, socket, head));
      console.log(color.xterm(8)("New ") + color.xterm(221)("WS") + color.xterm(8)(" client logged in [total ") + color.xterm(221)(JSTP.theWebsockets.length) + color.xterm(8)("]"));
   
      JSTP.theWebsockets[JSTP.theWebsockets.length -1].onopen = function (event) {
        var currentIndex = JSTP.theWebsockets.indexOf(this);
      }
   
      JSTP.theWebsockets[JSTP.theWebsockets.length -1].onmessage = function (event) { try {
        var currentIndex = JSTP.theWebsockets.indexOf(this);
   
        // Parse and log whats coming
        // console.log(color.xterm(8)(event.data)); No need to log raw
        var pack = JSON.parse(event.data);

        // Only provide a callback if the Dispatch wants one 
        // or if it is a Subscription Dispatch
        if (pack.token[0] || 
            pack.method.toUpperCase() == "BIND" || 
            pack.method.toUpperCase() == "RELEASE") {
          JSTP.dispatch(pack, JSTP._answer, this, currentIndex);
        }
        else {
          JSTP.dispatch(pack);
        }    

      } catch (err) {
        console.log(err.message);
        console.log(err.stack);
      }}
   
      JSTP.theWebsockets[JSTP.theWebsockets.length -1].onclose = function (event) { try {      
        var currentIndex = JSTP.theWebsockets.indexOf(this);
        console.log(color.xterm(8)("Closed ") + color.xterm(221)("WS") + color.xterm(8)(" client connection [") + color.xterm(221)("#" + currentIndex) + color.xterm(8)("]"));

        JSTP._releaseOfClient(this);

        JSTP.theWebsockets.splice(currentIndex, 1);


      } catch (err) {
        console.log(err.message);
        console.log(err.stack);
      }} 
    });
  },

  tcpServer: function (port) {
    port = port || 33333;

    var server = require('net').createServer( function(connection) { //'connection' listener
      JSTP.theTCPSockets.push(connection);
      console.log(color.xterm(8)("New ") + color.xterm(221)("TCP") + color.xterm(8)(" client logged in [total ") + color.xterm(221)(JSTP.theTCPSockets.length) + color.xterm(8)("]"));

      connection.on('end', function() { try {      
        var currentIndex = JSTP.theTCPSockets.indexOf(this);
        console.log(color.xterm(8)("Closed ") + color.xterm(221)("TCP") + color.xterm(8)(" client connection [") + color.xterm(221)("#" + currentIndex) + color.xterm(8)("]"));

        JSTP._releaseOfClient(this);

        JSTP.theTCPSockets.splice(currentIndex, 1);
      } catch (err) {
        console.log(err.message);
        console.log(err.stack);
      }});
      
      connection.on('data', function(data) {try {
        var currentIndex = JSTP.theTCPSockets.indexOf(this);

        // Parse and log whats coming
        // console.log(color.xterm(8)(data)); No reason to log the full dispatch
        var splitted = data.toString().split("\n");
        for (index in splitted) {
          if (splitted[index].replace(/ /, "") != "") {
            var pack = JSON.parse(splitted[index]);

            // Only provide a callback if the Dispatch wants one 
            // or if it is a Subscription Dispatch
            if (pack.token[0] || 
                pack.method.toUpperCase() == "BIND" || 
                pack.method.toUpperCase() == "RELEASE") {
              JSTP.dispatch(pack, JSTP._answer, this, currentIndex);
            }
            else {
              JSTP.dispatch(pack);
            }        
          }
        }

      } catch (err) {
        console.log(err.message);
        console.log(err.stack);
      }});
    });

    server.listen(port, function() { //'listening' listener
      console.log(color.xterm(221)('TCP ') + color.xterm(8)('server bound on port ') + color.xterm(221)(port));
    });
  },

  // Shorthands & Aliases
  /////////////////////////////////////////////////
  put: function (pack, callback, context) { 
    pack.method = "PUT";
    this.dispatch(pack, callback, context);
    return this;
  },

  get: function (pack, callback, context) {
    pack.method = "GET";
    this.dispatch(pack, callback, context);
    return this;
  },

  post: function (pack, callback, context) {
    pack.method = "POST";
    this.dispatch(pack, callback, context);
    return this;
  },

  delete: function (pack, callback, context) {
    pack.method = "DELETE";
    this.dispatch(pack, callback, context);
    return this;
  },

  patch: function (pack, callback, context) {
    pack.method = "PATCH";
    this.dispatch(pack, callback, context);
    return this;
  },

  release: function (pack, callback, context) {
    pack.method = "RELEASE";
    this.dispatch(pack, callback, context);
    return this;
  },

  off: function (pack, callback, context) {
    pack.method = "RELEASE";
    this.dispatch(pack, callback, context);
    return this;
  },

  bind: function (pack, callback, context) {
    pack.method = "BIND";
    this.dispatch(pack, callback, context);
    return this;
  },

  on: function (pack, callback, context) {
    pack.method = "BIND";
    this.dispatch(pack, callback, context);
    return this;
  },

  // Classes
  /////////////////////////////////////////////////
  Dispatch: Dispatch
}

module.exports = JSTP