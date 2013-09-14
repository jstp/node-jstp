var net     = require("net");
var port    = 22222;
var clients = [];
var color   = require("cli-color");

var server = net.createServer( function (connection) { 
  
  clients.push(connection);
  
  console.log(
    color.xterm(8)    ("New ") + 
    color.xterm(221)  ("TCP") + 
    color.xterm(8)    (" client logged in [total ") + 
    color.xterm(221)  (clients.length) + 
    color.xterm(8)    ("]")
  );

  connection.on("close", function () {
    var currentIndex = clients.indexOf(this);
    console.log(
      color.xterm(8)    ("Closed ") + 
      color.xterm(221)  ("TCP") + 
      color.xterm(8)    (" client connection [") + 
      color.xterm(221)  ("#" + currentIndex) + 
      color.xterm(8)    ("]")
    );
  });

  connection.on("data", function (data) {
    console.log(data.toString());
  });

});

server.listen(port, function () {

  console.log(
    color.xterm(221)  ('TCP ') + 
    color.xterm(8)    ('server bound on port ') + 
    color.xterm(221)  (port)
  );

});