var JSTP = require('../../lib/jstp.js');

JSTP.dispatch({
  host: [['localhost', 33333, "tcp"]],
  method: "PUT",
  resource: ["User", "Xavier"]
});