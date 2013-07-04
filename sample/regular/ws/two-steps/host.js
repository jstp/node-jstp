var jstp      = require("../../../../index.js");
var express   = require('express');
var http      = require("http");
var app       = express();
server        = http.createServer(app);

app.configure( function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.logger('dev'));
});

app.get("/", function (req, res) {
  res.send("Dummy HTTP Server");
});

jstp.listen({
  ws: server
});

server.listen(9000, function () {
  console.log("HTTP/Websocket server listening on port 9000");
});