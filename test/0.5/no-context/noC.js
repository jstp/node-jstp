var JSTP = require('../../../lib/jstp');

console.log("This is not working, see https://github.com/southlogics/node-jstp/issues/8");
process.exit();

var noC = "No context";

JSTP.bind({
  endpoint: {
    method: "PUT",
    resource: ["User", "*"]
  }
}, function (engine, answer, dispatch) {
  console.log(noC);
  console.log(dispatch);
});

setTimeout( function () {
  JSTP.put({
    resource: ["User", "Harry Potter"]
  });
}, 1000);