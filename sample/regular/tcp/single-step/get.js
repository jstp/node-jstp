var jstp = require("../../../../index.js");

jstp.get({
  host: [["localhost", 33333, "tcp"]],
  resource: ["User"],
  body: {
    message: "Hello World"
  }
});