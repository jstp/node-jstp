var jstp = require("../../../index.js");

jstp.post({
  resource: ["User"],
  body: {
    message: "Hello World"
  }
});