var jstp = require("../../../../../../index.js");

console.log("-- Unsupported --");
process.exit();

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
    method: "DELETE",
    resource: [":resource"],
  }
}, Resource.userGet, Resource);

setTimeout( function () {
  jstp.release({
    host: [["localhost", 8000, "ws"], ["localhost", 9000, "ws"]],
    endpoint: {
      method: "DELETE",
      resource: [":resource"],
    }
  }, Resource.userGet, Resource);
  
  setTimeout( function () {
    jstp.delete({
      host: [["localhost", 8000, "ws"], ["localhost", 9000, "ws"]],
      resource: ["User"],
      body: {
        message: "Hello World"
      }
    });
  }, 1000);
}, 1000);
