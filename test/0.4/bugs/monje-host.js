var jstp    = require('../../../index.js');
var monje   = require('monje');

monje.bind(jstp);

var db = new monje.mongodb.Db('test', new monje.mongodb.Server("localhost", 27017));
db.open( function (err, db) {
  monje.mongoConnection = db;
  
  jstp.listen({
    tcp: 44444
  })

});
