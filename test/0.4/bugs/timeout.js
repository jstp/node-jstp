var jstp = require('../../../index.js');

var methods = {
  slow: function (dispatch) {
    setTimeout( function () {
      console.log("Sloooww");   
    }, 1000);
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