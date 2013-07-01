var jstp = require("../../../index.js");

var User = {
  answerFromPostalService: function (engine, answer) {
    engine.answer(answer, 200, { "message": "Oops, sorry, I forgot to write it down"});
  }
}

jstp.post({
  host: [["localhost", 33333, "tcp"], ["localhost", 44444, "tcp"]],
  resource: ["Letter"],
  body: {
    title: "I don't know where to send!"
  }
}, User.answerFromPostalService, User);
