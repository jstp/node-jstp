var jstp    = require('../../index.js');
var monje   = require('monje');

monje.bind(jstp);

var db = new monje.mongodb.Db('test', new monje.mongodb.Server("localhost", 27017));
db.open( function (err, db) {
  monje.mongoConnection = db;
  
  var methods = {
    fast: function (dispatch) {
      console.log("Here I am, the 'fast'");   
    },

    slow: function (dispatch) {
      console.log("Here I am, the 'slow'");   
    }, 

  }


  jstp.bind({
    endpoint: {
      method: "POST",
      resource: ["Something"]
    }
  }, methods.fast, methods).bind({

    endpoint: {
      method: "PUT",
      resource: ["Something", "*"]
    }
  }, methods.slow, methods);

  jstp.post({resource: ["Something"], body: { name: "hola" } });

});
