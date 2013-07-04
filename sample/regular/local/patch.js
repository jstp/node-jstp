var jstp = require("../../../index.js");

jstp.patch({
  resource: ["User"],
  body: {
    message: "Hello World"
  }
});