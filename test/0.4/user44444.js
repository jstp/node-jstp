var JSTP = require('../../lib/jstp.js');

JSTP.dispatch({
  host: [['localhost', 44444, "tcp"]],
  method: "PUT",
  resource: ["User", "Luciano"]
});