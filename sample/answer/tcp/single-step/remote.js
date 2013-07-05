var jstp = require("../../../../index.js");

var Blabla = {};

jstp.get({
  host: [["localhost", 33333, "tcp"]],
  resource: ['Anyway']
}, function (engine, answer) {
  console.log(answer);
}, Blabla);