var JSTP = require('../../lib/jstp');

var obj = {
  print: function (engine, dispatch) {
    console.log("Epic to have a response!");
  }
}

JSTP.bind({
  host: [["localhost", 1337, "websocket"], ['localhost', 44444, "tcp"]],
  endpoint: {
    method: "PUT",
    resource: ["User", "*"]
  }
}, obj.print, obj);