var JSTPEndpoint = require("./endpoint")
  , exceptions = require("./exceptions");

function JSTPSubscriptionManager(engine) {
  this.engine         = engine;
  this.subscriptions  = [];
}

/*
 * bind( JSTPEndpoint endpoint, String transactionID, JSTPCallable callback [, Object context ] )
 * ----------------------------------------------------------------------------------------------
 *
 * Adds the endpoint to the subscriptions table.
 * 
 * Throws exceptions if the arguments are invalid. Throws JSTPEndpointAlreadyBound if
 * the endpoint/callback/context tuple was already present in the subscriptions table.
 *
 * #### Arguments
 *
 * - JSTPEndpoint endpoint
 * - String transactionID
 * - JSTPCallable callback
 * - _optional_ Object context
 *
 */
JSTPSubscriptionManager.prototype.bind = function (endpoint, transactionID, callback, context) {
  if (!(endpoint instanceof JSTPEndpoint))
    throw new exceptions.JSTPNotAnEndpoint(
      "The first argument of #bind must be a JSTPEndpoint");

  if (!transactionID)
    throw new exceptions.JSTPMissingTransactionID(
      "A transactionID is required");

  if (!(callback.call instanceof Function))
    throw new exceptions.JSTPNotCallable(
      "The callback must have a #call method");

  endpoint.validate();

  if (this.subscriptions.length > 0) 
    for (index in this.subscriptions)
      if (
          this.subscriptions[index].endpoint.equivalent(endpoint) && 
          this.subscriptions[index].callback == callback && 
          this.subscriptions[index].context == context)
        throw new exceptions.JSTPEndpointAlreadyBound(
          "The endpoint " + endpoint.toString() + " is already bound for that callback and context");

  this.subscriptions.push({
    endpoint: endpoint,
    transactionID: transactionID,
    callback: callback,
    context: context
  }); 
}

/*
 * release( JSTPEndpoint endpoint, JSTPCallable callback [, Object context ] )
 * ---------------------------------------------------------------------------
 *
 * If present, removes the endpoint/callback/context tuple from the subscriptions table.
 *
 * Throws a JSTPUnboundEndpoint exception if the tuple matches nothing.
 *
 * #### Arguments
 *
 * - JSTPEndpoint endpoint
 * - JSTPCallable callback
 * - _optional_ Object context
 *
 * #### Throws
 *
 * - JSTPUnboundEndpoint
 *
 */
JSTPSubscriptionManager.prototype.release = function (endpoint, callback, context) {
  var index = this.indexOf(endpoint, callback, context);

  if (index == -1)
    throw new exceptions.JSTPUnboundEndpoint(
      "The endpoint " + endpoint.toString() + " is not bound for that callback and context");

  this.subscriptions.splice(index, 1);
}

/*
 * indexOf( JSTPEndpoint endpoint, JSTPCallable callback [, Object context ] )
 * ---------------------------------------------------------------------------
 *
 * Returns the index of the described tuple within the subscriptions table, if present.
 *
 * If not present, returns -1.
 *
 * #### Arguments
 *
 * - JSTPEndpoint endpoint
 * - JSTPCallable callback
 * - _optional_ Object context
 *
 * #### Returns
 *
 * - Integer index
 *
 */
JSTPSubscriptionManager.prototype.indexOf = function (endpoint, callback, context) {
  var matches = false;
  var index   = 0;
  
  while (!matches && index < this.subscriptions.length) {
    if (this.subscriptions[index].endpoint.equivalent(endpoint) &&
      this.subscriptions[index].callback == callback &&
      this.subscriptions[index].context == context)
      matches = true;
    index ++;
  }

  if (matches) index --;
  else index = -1;

  return index;
}

/*
 * trigger( JSTPDispatch dispatch )
 * --------------------------------
 *
 * Triggers all the Endpoints that match the dispatch 

module.exports = JSTPSubscriptionManager;