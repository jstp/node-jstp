var net   = require('net')
  , color = require("cli-color")
  , pool  = {};

var TCP = function (address, dispatch, jstp) {
  var actualAddress = address[0] + ":" + address[1];
  if (pool[actualAddress] && pool[actualAddress].writable)
    pool[actualAddress].write(dispatch + "\n");

  else {
    if (pool[actualAddress]) {
      pool[actualAddress].destroy();
      pool[actualAddress] = null;
    }

    pool[actualAddress] = net.connect(address[1], address[0], function () {
      this.write(dispatch + "\n");
      dispatch = null;
    });

    pool[actualAddress].on('data', function (data) {
      var address;
      for (addr in pool) {
        if (pool[addr] == this) {
          address = addr;
          break;
        }
      }
      console.log(color.xterm(8)("◀ incoming data from ") + color.xterm(24)(address));
      try {
        var splitted = data.toString().split("\n");
        for (index in splitted) {
          if (splitted[index].replace(/ /, "") != "") {
            var pack = JSON.parse(splitted[index]);

            var method;
            var resource;
            if (pack.endpoint) {
              method    = pack.method + " " + pack.endpoint.method;
              resource  = pack.endpoint.resource;
            }
            else {
              method    = pack.method;
              resource  = pack.resource;
            }
            console.log(color.xterm(24)("◀ " + address + ":tcp " + method + " " + resource.join("/")));

            // Only provide a callback if the Dispatch wants one 
            // or if it is a Subscription Dispatch
            if (pack.token[0] || 
                pack.method.toUpperCase() == "BIND" || 
                pack.method.toUpperCase() == "RELEASE") {
              jstp.dispatch(pack, jstp._answer, this);
            }
            else {
              jstp.dispatch(pack);
            }    
          }
        }

      } catch (err) {
        console.log(err.message);
        console.log(err.stack);
      }
    });

    pool[actualAddress].on('error', function (event) {
      console.log("Error! sending message");
    });

    pool[actualAddress].on('close', function (event) {
      console.log("Outbound connection to " + actualAddress + " closed");
      actualAddress = null;
    });
  }
}

module.exports = TCP;