var jstp = require("../../../../../index.js");

var Resource = {
  process: function (engine, answer, dispatch) {
    engine.answer(dispatch, 200, { message: "Ok" });
  },
  answer: function (engine, answer) {
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
  });
}, 1000)