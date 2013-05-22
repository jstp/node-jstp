var WebSocket       = require("faye-websocket")
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
  theSockets: [],
  bound: [],

  put: function (pack, callback, context, index) { 
    pack.method = "PUT";
    this.dispatch(pack, callback, context, index);
  },

  get: function (pack, callback, context, index) {
    pack.method = "GET";
    this.dispatch(pack, callback, context, index);
  },

  bind: function (pack, callback, context, index) {
    pack.method = "BIND";
    this.dispatch(pack, callback, context, index);
  },

  on: function (pack, callback, context, index) {
    pack.method = "BIND";
    this.dispatch(pack, callback, context, index);
  },

  dispatch: function (pack, callback, context, index) { try {
    pack = new Dispatch(pack);

    if (pack.resource) 
      console.log(color.xterm(25)(
        pack.method + " " + pack.resource.join("/") + " " +
        JSON.stringify(pack.body)
      ));
    else
      console.log(color.xterm(25)(
        pack.method + " " + pack.endpoint.method + " " + pack.endpoint.resource.join("/") + " " +
        JSON.stringify(pack.body)          
      ));

    switch (pack.method.toLowerCase()) {
      case "bind":
        this._bind(pack, callback, context, index);
        break;

      case "release":
        this._release(pack, callback, context, index);
    }

    this._trigger(pack, context);

  } catch(err) {
    console.log(err.message);
    console.log(err.stack);
  }},

  _bind: function (pack, callback, context, index) {
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
      console.log(this._compare(pack.endpoint, this.bound[i].endpoint.method, this.bound[i].endpoint.resource, true));
      console.log(color.green(this.bound[i].context  == context));
      if (
        this._compare(pack.endpoint, this.bound[i].endpoint.method, this.bound[i].endpoint.resource, true) &&
        this.bound[i].context  == context
      ) {
        console.log(color.xterm(205)("Unbinding " + JSON.stringify(this.bound[i].endpoint)));
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
    for (index in this.bound) {
      if (this.bound[index].context != context) {      
        endpoint = this.bound[index].endpoint;
        boundMethod = endpoint.method.toLowerCase();
        switch (packMethod) {
          case "bind":
          case "release":
            if (this._compare(endpoint, pack.method, pack.endpoint.resource))
              this.bound[index].callback.call(this.bound[index].context, pack);
            break;
          case "patch":
          case "put":
          case "get":
          case "post":
          case "delete":
            if (this._compare(endpoint, pack.method, pack.resource))
              this.bound[index].callback.call(this.bound[index].context, pack);
            break;
        }
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

  answer: function (dispatch) {
    if (this.readyState == 1) {
      console.log(color.xterm(24)("Sending dispatch back to client"));
      this.send(dispatch.toString());
    }
    else
      console.log(color.xterm(203)("Client disconnected, dispatch not sent"));
  },

  server: function (httpServer) {
    httpServer.addListener('upgrade', function (request, socket, head) {
      JSTP.theSockets.push(new WebSocket(request, socket, head));
   
      JSTP.theSockets[JSTP.theSockets.length -1].onopen = function (event) {
        var currentIndex = JSTP.theSockets.indexOf(this);
        console.log(color.xterm(25)("New client logged in " + currentIndex));
      }
   
      JSTP.theSockets[JSTP.theSockets.length -1].onmessage = function (event) { try {
        var currentIndex = JSTP.theSockets.indexOf(this);
   
        // Parse and log whats coming
        console.log(color.xterm(8)(event.data));
        var pack = JSON.parse(event.data);
        JSTP.dispatch(pack, JSTP.answer, this, currentIndex);

      } catch (err) {
        console.log(err.message);
        console.log(err.stack);
      }}
   
      JSTP.theSockets[JSTP.theSockets.length -1].onclose = function (event) { try {      
        var currentIndex = JSTP.theSockets.indexOf(this);
        console.log(color.xterm(25)("Client disconnected " + currentIndex));

        JSTP._releaseOfClient(this);

        JSTP.theSockets.splice(currentIndex, 1);


      } catch (err) {
        console.log(err.message);
        console.log(err.stack);
      }} 
    });
  },

  Dispatch: Dispatch
}

module.exports = JSTP