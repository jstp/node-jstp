var net = require('net');

exports.dispatch = function(method, resource) {
  var toSend = {};
  toSend.method = method.toUpperCase();
  toSend.resource = resource.split("/");
  
  var socket = new net.Socket();
  socket.connect(33333);
  socket.write(JSON.stringify(toSend) + "\n");
  socket.destroy();
}