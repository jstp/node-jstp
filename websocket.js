var WebSocket = require('faye-websocket'),
    color     = require('cli-color'),
    dark      = color.xterm(8),
    ws        = new WebSocket.Client('ws://localhost:8000/');

ws.onopen = function(event) {
  var dispatch = {
    method: "GET",
    resource: ["browser", "Token"],
    body: {},
    protocol: ["JSTP", "0.1"],
    token: [0, 0, "adsfasdfwer"],
    timestamp: +new Date()
  }

  console.log(dark('Sent ' + JSON.stringify(dispatch)));
  ws.send(JSON.stringify(dispatch));
};

ws.onmessage = function(event) {
  console.log('message', event.data);
};

ws.onclose = function(event) {
  console.log('close', event.code, event.reason);
  ws = null;
};