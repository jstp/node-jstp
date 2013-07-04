var jstp      = require("../../../../index.js");

jstp.put({
  host: [["localhost", 8000, "ws"]],
  resource: ["Websocket"],
  body: {
    message: "Works flawlessly"
  }
});