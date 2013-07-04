var jstp = require("../../../../../index.js");

var Resource = {
  process: function (engine, answer, dispatch) {
    console.log("Will timeout, won't answer");
  },

  answer: function (engine, answer) {
    console.log("Here is the timeout");
    console.log(answer);
  }
}

jstp.bind({
  endpoint: {
    method: "*",
    resource: ["User"]
  }
}, Resource.process, Resource);

setTimeout( function () {
  jstp.get({
    resource: ["User"],
    body: {
      message: "Hello World"
    }
  }, Resource.answer, Resource);
}, 1000)