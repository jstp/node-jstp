var jstp      = require("../../../../index.js");

jstp.get({
  host: [["localhost", 8000, "ws"], ["localhost", 9000, "ws"]],
  resource: ["Websocket"],
  body: {
    message: "Works flawlessly"
  }
});