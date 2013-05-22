var net   = require('net')
  , pool  = {};

var TCP = function (address, dispatch) {
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

    pool[actualAddress].on('error', function (event) {
      console.log("Error! sending message");
    });
  }
}

module.exports = TCP;