var jstp = require("../../../../../index.js");

var Resource = {
  process: function (engine, answer, dispatch) {
    if (answer) console.log("First Resource Answer");
  },
  answer: function (engine, answer) {
    console.log(answer);
  }
}
var SecondResource = {
  process: function (engine, answer, dispatch) {
    if (answer) console.log("Second Resource Answer");
  }
}

jstp.bind({
  endpoint: {
    method: "*",
    resource: ["User"]
  }
}, Resource.process, Resource);

setTimeout( function () {
  jstp.bind({
    endpoint: {
      method: "*",
      resource: ["User"]
    }
  }, SecondResource.process, SecondResource);

  setTimeout( function () {
    jstp.get({
      resource: ["User"],
      body: {
        message: "Hello World"
      }
    }, Resource.answer, Resource);
  }, 2000);
}, 2000);