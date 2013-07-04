var jstp      = require("../../../../index.js");

jstp.patch({
  host: [["localhost", 8000, "ws"]],
  resource: ["Websocket"],
  body: {
    message: "Works flawlessly"
  }
});