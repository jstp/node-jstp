var jstp = require('../../index.js');
jstp.get({
  resource: ["User"],
  exception: {
    code: 404,
    message: "Not Found"
  }
})