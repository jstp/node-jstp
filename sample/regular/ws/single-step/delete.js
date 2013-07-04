var jstp      = require("../../../../index.js");

jstp.delete({
  host: [["localhost", 8000, "ws"]],
  resource: ["Websocket"],
  body: {
    message: "Works flawlessly"
  }
});