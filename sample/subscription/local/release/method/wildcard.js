var jstp = require("../../../../../index.js");

var Resource =  {
  userGet: function (engine, answer, dispatch) {
    if (answer) console.log("The answer: " + answer.body);
    else console.log(dispatch);
  }
}

jstp.bind({
  endpoint: {
    method: "*",
    resource: ["User"],
  }
}, Resource.userGet, Resource);

setTimeout( function () {
  jstp.release({
    endpoint: {
      method: "*",
      resource: ["User"]
    }
  }, Resource.userGet, Resource);
  
  setTimeout( function () {
    jstp.delete({
      resource: ["User"],
      body: {
        message: "Hello World"
      }
    });
  }, 1000);
}, 1000);