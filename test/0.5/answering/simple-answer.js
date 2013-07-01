var jstp = require("../../../index.js");

var PostalService = {
  sendLetter: function (engine, answer, dispatch) {
    engine.answer(
      dispatch, 
      404, 
      { "message": "The address you specified was not found" },
      PostalService.customerAnswer, 
      PostalService
    );
  },

  customerAnswer: function (engine, answer) {
    console.log(answer);
  }
}

var User = {
  answerFromPostalService: function (engine, answer) {
    engine.answer(answer, 200, { "message": "Oops, sorry, I forgot to write it down"});
  }
}

jstp.bind({
  endpoint: {
    method: "POST",
    resource: ["Letter"]
  }
}, PostalService.sendLetter, PostalService);

setTimeout(function () {
  jstp.post({
    resource: ["Letter"],
    body: {
      title: "I don't know where to send!"
    }
  }, User.answerFromPostalService, User);
}, 1000);