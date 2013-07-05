var jstp = require("../../../../index.js");

var Resource = {
  process: function (engine, answer, dispatch) {
    if (!answer) engine.answer(dispatch, 200, "Testing");
  }
}

jstp.bind({
  endpoint: {
    method: "GET",
    resource: ["Anyway"]
  }
}, Resource.process, Resource);

jstp.listen({
  tcp: 33333
});