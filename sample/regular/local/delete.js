var jstp = require("../../../index.js");

jstp.delete({
  resource: ["User"],
  body: {
    message: "Hello World"
  }
});