var jstp = require('../../index.js');

var methods = {
  slow: function (dispatch) {
    setTimeout( function () {
      for (i = 0; i < 1000000000; i ++) {
        "2" + "2";
      }
      console.log("Sloooww");         
    }, 2);
  }, 

  fast: function (dispatch) {
    setTimeout( function () {
      for (i = 0; i < 1000000000; i ++) {
        "2" + "2";
      }
      console.log("Fast");         
    }, 1);
  }
}

jstp.bind({
  endpoint: {
    method: "PUT",
    resource: ["Something"]
  }
}, methods.slow, methods).bind({
  endpoint: {
    method: "PUT",
    resource: ["Something"]
  }
}, methods.fast, methods);


jstp.put({resource: ["Something"]});