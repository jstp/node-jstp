var jstp = require("../../../../index.js");

jstp.delete({
  host: [["localhost", 33333, "tcp"], ["localhost", 44444, "tcp"]],
  resource: ["User"],
  body: {
    message: "Hello World"
  }
});