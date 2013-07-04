var jstp = require("../../../../../../index.js");

console.log("-- Unsupported --");
process.exit();

var Resource =  {
  userGet: function (engine, answer, dispatch) {
    if (answer) console.log("The answer: " + answer.body);
    else console.log(dispatch);
  }
}

var host = [["localhost", 33333, "tcp"], ["localhost", 44444, "tcp"]];

jstp.bind({
  host: host,
  endpoint: {
    method: "DELETE",
    resource: ["..."],
  }
}, Resource.userGet, Resource);

setTimeout( function () {
  jstp.delete({
    host: host,
    resource: ["User"],
    body: {
      message: "Hello World"
    }
  });
}, 1000);
