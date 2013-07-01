var jstp = require('../../../index.js');

var Responder = {
  bind: function (dispatch) {
    if (dispatch.referer[0] != 'Monje')
      jstp.post({
        resource: ['Article', "lala", "werwe"],
        body: "Testing",
        referer: ["Monje"]
      });
  }
}

jstp.bind({
  endpoint: {
    method: 'POST',
    resource: ['Article']
  }
}, Responder.bind, Responder);

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