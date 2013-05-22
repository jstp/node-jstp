var JSTP = require('../lib/jstp');

JSTP.bind({
  host: [["localhost", 33333, "tcp"]],
  endpoint: {
    method: "PUT",
    resource: ["User", "*"]
  }
})