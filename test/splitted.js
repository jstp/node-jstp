var JSTP = require('../lib/jstp');

JSTP.listen({
  tcp: 22222
});

var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

JSTP.listen({
  websocket: server
});

server.listen(1337, '127.0.0.1');