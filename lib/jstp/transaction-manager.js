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

JSTPTransactionManager.prototype.newWithTriggeringID = function (dispatch) {
  var clone = new JSTPDispatch();
  var triggeringID = uuid.v4();
  
  clone.setMethod(dispatch.getMethod());
  clone.setResource(this._clone(dispatch.getResource()));
  clone.setTo(this._clone(dispatch.getTo()));
  clone.setFrom(this._clone(dispatch.getFrom()));
  clone.setTimestamp(dispatch.getTimestamp());

  // If endpoint, clone the endpoint
  if (dispatch.getEndpoint()) {
    var oldEndpoint = dispatch.getEndpoint();
    var endpoint = new JSTPEndpoint();
    endpoint.setMethodPattern(
      oldEndpoint.getMethodPattern());
    endpoint.setResourcePattern(
      this._clone(oldEndpoint.getResourcePattern()));
    endpoint.setFromPattern(
      this._clone(oldEndpoint.getFromPattern()));
    endpoint.setToPattern(
      this._clone(oldEndpoint.getToPattern));
    clone.setEndpoint(endpoint);
  }

  // Clone the token
  var token = [dispatch.getToken()[0]];
  token[1]  = triggeringID;
  clone.setToken(token);

  // Add the Triggering ID to the list
  this.list[token[0]].push(token[1]);

  return clone;
}

JSTPTransactionManager.prototype.received = function (answer) {
  this.list[answer.getResource()[1]]
    .splice(
      this.list[answer.getResource()[1]]
        .indexOf(answer.getResource()[2]),
      1
    );
}

JSTPTransactionManager.prototype.check = function (transactionID) {
  if (this.list[transactionID].length == 0)
    this.stop(transactionID);
}

JSTPTransactionManager.prototype.stop = function (transactionID) {
  delete this.list[transactionID];
}

JSTPTransactionManager.prototype._clone = function (array) {
  var clone = [];
  for (index in array) clone[index] = array[index];
  return clone;
}


module.exports = JSTPTransactionManager;