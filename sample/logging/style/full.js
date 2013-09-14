var jstp = require("../../index.js");

console.log(new jstp.Dispatch({
  method: "GET",
  resource: ["User", "235zf798as345rrewq42"],
  body: {
    message: "La posta"
  },
  referer: ["Monje"],
  token: ["a58493457asf56", "546tst546sdfs546"]
}).toLog());