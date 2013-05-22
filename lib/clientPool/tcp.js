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
      console.log("It answered! " + data);
      try {
        // Parse and log whats coming
        console.log(color.xterm(8)(data));
        var pack = JSON.parse(data);
        jstp.dispatch(pack, jstp.answer, this);

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