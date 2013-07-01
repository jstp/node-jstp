var jstp = require('../../lib/jstp.js');

var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

jstp.listen({
  tcp: 33333,
  websocket: server
});

/*
var obj = {
  answer: function (dispatch) {
    jstp.put({
      resource: ["User", "Article"]
    });
  }
}

jstp.bind({
  endpoint: {
    method: "BIND",
    resource: ["User", "*"]
  }
}, obj.answer, obj);
*/

server.listen(1337, '127.0.0.1');