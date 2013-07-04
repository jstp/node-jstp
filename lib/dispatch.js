var color           = require("cli-color");
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

  Dispatch.prototype.toLog = function() {
    var string = "";
    var resource;
    if (this.endpoint) {
      string += color.xterm(32)(this.method) + " ";
      string += color.xterm(25)(this.endpoint.method + " ");
      resource = this.endpoint.resource;
    }
    else if (this.method.toUpperCase() == "ANSWER") {
      string += color.xterm(208)(this.resource[1]) + " ";
      string += color.xterm(25)(this.method + " ");
      resource = this.resource;
    }
    else {
      string += color.xterm(25)(this.method + " ");
      resource = this.resource;
    }
    if (this.host && this.host.length > 0 && this.host[0])
      string += color.xterm(25)(this.host[0].join(":")) + " ";
    for (index in resource) {
      if (index > 0) string += color.xterm(8)("/");
      string += color.xterm(25)(resource[index]);
    }
    string += " " + color.xterm(8)(JSON.stringify(this.body)) + " ";
    if (this.token[0]) string += color.xterm(8)(this.token[0]);

    return string;
  };

  return Dispatch;

})();

module.exports = Dispatch;