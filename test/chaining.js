var JSTP = require('../lib/jstp');

JSTP
  .get({
    resource: ["Well"]
  })
  .post({
    resource: ["Hello I guess"]
  })
  .put({
    resource: ["Chaining"],
    body: "Is useful!"
  });