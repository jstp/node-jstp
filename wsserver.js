var WebSocket = require('faye-websocket'),
    server    = require('http').createServer(),
    color     = require('cli-color'),
    dark      = color.xterm(8),
    Recipes   = require('./recipes');

server.addListener('upgrade', function(request, socket, head) {
  var ws = new WebSocket(request, socket, head);

  ws.onmessage = function(event) {
    console.log(dark(event.data));
    var dispatch = JSON.parse(event.data);
    console.log(dark(dispatch.resource.join("/")));
  };

  ws.onclose = function(event) {
    console.log('close', event.code, event.reason);
    ws = null;
  };
});

server.listen(33333);