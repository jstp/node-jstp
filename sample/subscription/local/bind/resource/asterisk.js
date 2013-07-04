var jstp = require("../../../../../index.js");

var Resource =  {
  userGet: function (engine, answer, dispatch) {
    if (answer) console.log("The answer: " + answer.body);
    else console.log(dispatch);
  }
}

jstp.bind({
  endpoint: {
    method: "GET",
    resource: ["*"],
  }
}, Resource.userGet, Resource);

setTimeout( function () {
  jstp.get({
    resource: ["User"],
    body: {
      message: "Hello World"
    }
  });
}, 1000);