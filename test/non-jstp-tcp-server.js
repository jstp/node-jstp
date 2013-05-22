var net           = require('net');

var server = net.createServer( function(connection) { //'connection' listener

  console.log('server connected');

  connection.on('end', function() {
    console.log('client disconnected');
  });
  
  connection.on('data', function(data) {
    console.log(data.toString());
    try {
      var dispatch = JSON.parse(data.toString()); 
    } catch (err) {
      winston.warn('Datos colgados ' + data.toString());
    }
  });
});

server.listen(33333, function() { //'listening' listener
  console.log('server bound');
});
