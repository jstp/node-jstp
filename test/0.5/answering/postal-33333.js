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

jstp.bind({
  endpoint: {
    method: "POST",
    resource: ["Letter"]
  }
}, PostalService.sendLetter, PostalService);

jstp.listen({
  tcp: 33333
})