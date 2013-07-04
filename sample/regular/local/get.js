var jstp = require("../../../index.js");

jstp.get({
  resource: ["User"],
  body: {
    message: "Hello World"
  }
});