var jstp = require('../../index.js');

var methods = {
  slow: function (dispatch) {
    for (i = 0; i < 1000000000; i ++) {
      "2" + "2";
    }
    console.log("Sloooww");   
  }, 

  fast: function (dispatch) {
    console.log("Here I am, the 'fast'");   
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