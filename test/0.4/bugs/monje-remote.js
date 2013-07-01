var jstp    = require('../../../index.js');

var methods = {
  fast: function (dispatch) {
    console.log("Here I am, the 'fast'");   
  },

  slow: function (dispatch) {
    console.log("Here I am, the 'slow'");   
  }, 
}

jstp
.bind({
  host: [['localhost', 44444, 'tcp']],
  endpoint: {
    method: "POST",
    resource: ["Something", "*"]
  }
}, methods.fast, methods)

.bind({
  host: [['localhost', 44444, 'tcp']],
  endpoint: {
    method: "PUT",
    resource: ["Something", "*"]
  }
}, methods.slow, methods);

jstp.post({
  host: [['localhost', 44444, 'tcp']],
  resource: ["Something"], 
  body: { name: "hola" } 
});

