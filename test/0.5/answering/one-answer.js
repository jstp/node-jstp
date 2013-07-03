var jstp = require("../../../index.js");

var element = {
  execute: function (engine, answer) {
    console.log(answer);
  },

  subscribed: function (engine, answer, dispatch) {
    console.log("Subscribe");
    engine.answer(dispatch, 200, { message: "The answer" });
  }
}

jstp.bind({
  endpoint: {
    method: "GET",
    resource: ["User"]
  }
}, element.subscribed, element);


setTimeout( function () { 
  jstp.get({
    resource: ["User"],
    body: {
      message: "Answer me!"
    }
  });
}, 1000);