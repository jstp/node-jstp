var jstp = require("../../../../../index.js");

jstp.logger({
  remote: ["localhost", "22222", "tcp"]
})

jstp.get({
  resource: ["User"],
  body: {
    message: "Hello World"
  }
});