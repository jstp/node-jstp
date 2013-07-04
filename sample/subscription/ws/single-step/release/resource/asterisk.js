var jstp = require("../../../../../../index.js");

var Resource =  {
  userGet: function (engine, answer, dispatch) {
    if (answer) console.log("The answer: " + answer.body);
    else console.log(dispatch);
  }
}

var host = [["localhost", 8000, "ws"]];

jstp.bind({
  host: host,
  endpoint: {
    method: "PUT",
    resource: ["*"],
  }
}, Resource.userGet, Resource);

setTimeout( function () {
  jstp.release({
    host: [["localhost", 8000, "ws"]],
    endpoint: {
      method: "PUT",
      resource: ["*"],
    }
  }, Resource.userGet, Resource);
  
  setTimeout( function () {
    jstp.put({
      host: [["localhost", 8000, "ws"]],
      resource: ["User"],
      body: {
        message: "Hello World"
      }
    });
  }, 1000);
}, 1000);
