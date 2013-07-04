var jstp = require("../../../../../../index.js");

var Resource =  {
  userGet: function (engine, answer, dispatch) {
    if (answer) console.log("The answer: " + answer.body);
    else console.log(dispatch);
  }
}

var host = [["localhost", 8000, "ws"], ["localhost", 9000, "ws"]];

jstp.bind({
  host: host,
  endpoint: {
    method: "POST",
    resource: ["User"],
  }
}, Resource.userGet, Resource);

setTimeout( function () {
  jstp.release({
    host: [["localhost", 8000, "ws"], ["localhost", 9000, "ws"]],
    endpoint: {
      method: "POST",
      resource: ["User"],
    }
  }, Resource.userGet, Resource);
  
  setTimeout( function () {
    jstp.post({
      host: [["localhost", 8000, "ws"], ["localhost", 9000, "ws"]],
      resource: ["User"],
      body: {
        message: "Hello World"
      }
    });
  }, 1000);
}, 1000);
