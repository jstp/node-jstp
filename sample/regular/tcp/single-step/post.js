var jstp = require("../../../../index.js");

jstp.post({
  host: [["localhost", 33333, "tcp"]],
  resource: ["User"],
  body: {
    message: "Hello World"
  }
});