var uuid          = require('uuid')
  , JSTPDispatch  = require('./dispatch')
  , JSTPEndpoint  = require('./endpoint');

function JSTPTransactionManager(engine) {
  this.list = {};
  this.engine = engine;
}

JSTPTransactionManager.prototype.start = function (dispatch) {
  var transactionID;

  // If not set, add the Transaction ID to the dispatch
  if (dispatch.getToken().length > 0)
    transactionID = dispatch.getToken()[0];
  else {    
    transactionID = uuid.v4(); 
    dispatch.setToken([transactionID]);
  }

  // Set the timeout to stop listening to the Transaction ID
  var that = this;
  setTimeout(function () {
    that.stop(transactionID);
    transactionID = null;
  }, 10000);

  // Setup the Array of Triggerings for this Transaction ID
  this.list[transactionID] = [];

  // Fire the BIND ANSWER for the Transaction ID
  var bindAnswer = new JSTPDispatch();
  bindAnswer.setMethod("BIND");
  bindAnswer.setEndpoint(
    new JSTPEndpoint()
      .setMethodPattern("ANSWER")
      .setResourcePattern(["*", transactionID, "*"])
  );
  bindAnswer.setTo(dispatch.getTo());
  this.engine.dispatch(bindAnswer);
}

module.exports = JSTPTransactionManager;