var WebSocket   = require("faye-websocket")
  , color       = require("cli-color")
  , pool        = {};

var Websocket = function (address, dispatch, jstp) {
  var actualAddress = address[0] + ":" + address[1];
  if (pool[actualAddress] && pool[actualAddress].readyState == 1)
    pool[actualAddress].write(dispatch + "\n");

  else {
    if (pool[actualAddress]) {
      delete pool[actualAddress];
    }

    pool[actualAddress] = new WebSocket.Client('ws://' + address[0] + ':' + address[1] + '/');

    pool[actualAddress].onopen    = function(event) {
      this.send(dispatch);
      dispatch = null;
    };

    pool[actualAddress].onmessage = function(event) {
      console.log("It answered! " + event.data);
      try {
        // Parse and log whats coming
        console.log(color.xterm(8)(event.data));
        var pack = JSON.parse(event.data);
        jstp.dispatch(pack, jstp.answer, this);
      } catch (err) {
        console.log(err.message);
        console.log(err.stack);
      }      
    };

    pool[actualAddress].onclose   = function(event) {
      console.log("Outbound connection to " + actualAddress + " closed");
      delete pool[actualAddress];
    };
  }
}

module.exports = Websocket;