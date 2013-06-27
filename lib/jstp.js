var WebSocket       = require("faye-websocket")
  , clientPool      = require("./clientPool")
  , async           = require("async")
  , color           = require("cli-color");

var Dispatch = (function() {
  function Dispatch(options) {
    var key;

    for (key in options) {
      this[key] = options[key];
    }

    if (!this.protocol)   this.protocol   = ["JSTP", "0.4"];
    if (!this.timestamp)  this.timestamp  = +new Date().getTime();
    if (!this.token)      this.token      = [];
    if (!this.referer)    this.referer    = [];
    if (!this.body)       this.body       = {};
  }

  Dispatch.prototype.toString = function() {
    return JSON.stringify(this);
  };

  return Dispatch;

})();

var JSTP = {
  theWebsockets: [],
  theTCPSockets: [],
  bound: [],

  put: function (pack, callback, context, index) { 
    pack.method = "PUT";
    this.dispatch(pack, callback, context, index);
    return this;
  },

  get: function (pack, callback, context, index) {
    pack.method = "GET";
    this.dispatch(pack, callback, context, index);
    return this;
  },

  post: function (pack, callback, context, index) {
    pack.method = "POST";
    this.dispatch(pack, callback, context, index);
    return this;
  },

  delete: function (pack, callback, context, index) {
    pack.method = "DELETE";
    this.dispatch(pack, callback, context, index);
    return this;
  },

  patch: function (pack, callback, context, index) {
    pack.method = "PATCH";
    this.dispatch(pack, callback, context, index);
    return this;
  },

  release: function (pack, callback, context, index) {
    pack.method = "RELEASE";
    this.dispatch(pack, callback, context, index);
    return this;
  },

  off: function (pack, callback, context, index) {
    pack.method = "RELEASE";
    this.dispatch(pack, callback, context, index);
    return this;
  },

  bind: function (pack, callback, context, index) {
    pack.method = "BIND";
    this.dispatch(pack, callback, context, index);
    return this;
  },

  on: function (pack, callback, context, index) {
    pack.method = "BIND";
    this.dispatch(pack, callback, context, index);
    return this;
  },

  dispatch: function (pack, callback, context, index) { 
    try {
      pack = new Dispatch(pack);

      // If the Dispatch has a Resource
      if (pack.resource) 
        console.log(color.xterm(25)(
          pack.method + " " + pack.resource.join("/") + " " +
          JSON.stringify(pack.body)
        ));

      // Otherwise is assumed to have an Endpoint
      else
        console.log(color.xterm(25)(
          pack.method + " " + pack.endpoint.method + " " + pack.endpoint.resource.join("/") + " " +
          JSON.stringify(pack.body)          
        ));

      // BIND / RELEASE if appropiate
      switch (pack.method.toLowerCase()) {
        case "bind":
          this._bind(pack, callback, context, index);
          break;

        case "release":
          this._release(pack, callback, context, index);
      }

      // If the Dispatch has a Host, just forward it 
      if (pack.host && pack.host.length > 0)
        this.forward(pack);
      
      // Otherwise, trigger the matching Endpoints
      else
        this._trigger(pack, context);

    } catch(err) {
      console.log(err.message);
      console.log(err.stack);
    }
    return this;
  },

  _bind: function (pack, callback, context, index) {
    for (i in this.bound) {
      if (
        this._compare(pack.endpoint, this.bound[i].endpoint.method, this.bound[i].endpoint.resource, true) &&
        this.bound[i].context   == context &&
        this.bound[i].callback  == callback
      )
        return console.log("Endpoint already bound for that emitter");
    }

    var callbackObj;

    var host = [];
    if (pack.host && pack.host[0])
      host = pack.host[0]

    callbackObj = {
      endpoint: pack.endpoint,
      callback: callback,
      context: context,
      host: host, 
      index: index
    };

    return this.bound.push(callbackObj);
  },

  _release: function (pack, callback, context, index) {
    var newbound = []
    for (i in this.bound) {
      if (
        this._compare(pack.endpoint, this.bound[i].endpoint.method, this.bound[i].endpoint.resource, true) &&
        this.bound[i].context  == context
      ) {
        console.log(color.xterm(208)("Unbinding " + JSON.stringify(this.bound[i].endpoint)));
      }
      else {
        newbound.push(this.bound[i]);
      }
    }
    this.bound = newbound;
  },

  _trigger: function (pack, context) {
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
              var callbackItem = {
                callback: this.bound[index].callback,
                context: this.bound[index].context,
                pack: pack
              }
              callbacks.push(function (callme) {
                callme(null, null);
                this.callback.call(this.context, this.pack);
              }.bind(callbackItem));
            }
            break;
          case "patch":
          case "put":
          case "get":
          case "post":
          case "delete":
            if (this._compare(endpoint, pack.method, pack.resource)) {
              var callbackItem = {
                callback: this.bound[index].callback,
                context: this.bound[index].context,
                pack: pack
              }
              callbacks.push(function (callme) {
                callme(null, null);
                this.callback.call(this.context, this.pack);
              }.bind(callbackItem));
            }
            break;
        }
      }        
      index++;      
    }
    async.parallel(callbacks);
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

  answer: function (dispatch) {
    if (isNaN(this.readyState)) {
      if (this.writable) {        
        console.log(color.xterm(24)("Sending dispatch back to client"));
        this.write(dispatch.toString() + "\n");
      }
      else console.log(color.xterm(208)("TCP client disconnected, dispatch not sent"));
    }
    else {
      if (this.readyState == 1) {
        console.log(color.xterm(24)("Sending dispatch back to client"));
        this.send(dispatch.toString());
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

    console.log(color.xterm(23)(pack.method + " jstp+" + type + "://" + address[0] + ":" + address[1] + "/"));
    console.log(color.xterm(8)(stringPack));

    clientPool[type](address, stringPack, JSTP);
  },

  listen: function (options) {
    if (options.websocket)  this.httpServer(options.websocket);
    if (options.tcp)        this.tcpServer(options.tcp);
  },

  httpServer: function (httpServer) {
    httpServer.addListener('upgrade', function (request, socket, head) {
      JSTP.theWebsockets.push(new WebSocket(request, socket, head));
   
      JSTP.theWebsockets[JSTP.theWebsockets.length -1].onopen = function (event) {
        var currentIndex = JSTP.theWebsockets.indexOf(this);
        console.log(color.xterm(25)("New client logged in " + currentIndex));
      }
   
      JSTP.theWebsockets[JSTP.theWebsockets.length -1].onmessage = function (event) { try {
        var currentIndex = JSTP.theWebsockets.indexOf(this);
   
        // Parse and log whats coming
        console.log(color.xterm(8)(event.data));
        var pack = JSON.parse(event.data);
        JSTP.dispatch(pack, JSTP.answer, this, currentIndex);

      } catch (err) {
        console.log(err.message);
        console.log(err.stack);
      }}
   
      JSTP.theWebsockets[JSTP.theWebsockets.length -1].onclose = function (event) { try {      
        var currentIndex = JSTP.theWebsockets.indexOf(this);
        console.log(color.xterm(25)("Client disconnected " + currentIndex));

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
      console.log(color.xterm(25)("New TCP client logged in " + JSTP.theTCPSockets.length));

      connection.on('end', function() { try {      
        var currentIndex = JSTP.theTCPSockets.indexOf(this);
        console.log(color.xterm(25)("Client disconnected " + currentIndex));

        JSTP._releaseOfClient(this);

        JSTP.theTCPSockets.splice(currentIndex, 1);
      } catch (err) {
        console.log(err.message);
        console.log(err.stack);
      }});
      
      connection.on('data', function(data) {try {
        var currentIndex = JSTP.theTCPSockets.indexOf(this);

        // Parse and log whats coming
        console.log(color.xterm(8)(data));
        var splitted = data.toString().split("\n");
        for (index in splitted) {
          if (splitted[index].replace(/ /, "") != "") {
            var pack = JSON.parse(splitted[index]);
            JSTP.dispatch(pack, JSTP.answer, this, currentIndex);
          }
        }

      } catch (err) {
        console.log(err.message);
        console.log(err.stack);
      }});
    });

    server.listen(port, function() { //'listening' listener
      console.log('server bound');
    });
  },

  Dispatch: Dispatch
}

module.exports = JSTP