var JSTPEndpoint      = require("./endpoint")
  , JSTPSubscription  = require("./subscription")
  , JSTPTriggeringPackage = require("./triggering-package")
  , exceptions        = require("./exceptions");

function JSTPSubscriptionManager(engine) {
  this.engine         = engine;
  this.subscriptions  = [];
}

/*
 * bind( JSTPSubscription subscription)
 * ------------------------------------
 *
 * Adds the endpoint to the subscriptions table.
 * 
 * Throws exceptions if the argument is not a JSTPSubscription or some properties 
 * of the subscription are missing.
 *
 * Throws JSTPEndpointAlreadyBound if the endpoint/callback/context tuple was 
 * already present in the subscriptions table.
 *
 * #### Arguments
 *
 * - JSTPSubscription subscription
 *
 * #### Throws
 *
 * - JSTPEndpountAlreadyBound
 * - JSTPMissingCallback
 * - JSTPMissingTransactionID
 * - JSTPNotASubscription
 *
 */
JSTPSubscriptionManager.prototype.bind = function (subscription) {
  if (!(subscription instanceof JSTPSubscription))
    throw new exceptions.JSTPNotASubscription(
      "The argument of #bind must be a JSTPSubscription");

  if (!subscription.getTransactionID())
    throw new exceptions.JSTPMissingTransactionID(
      "A transactionID is required");

  if (!subscription.getCallback())
    throw new exceptions.JSTPMissingCallback(
      "The callback is required");

  subscription.getEndpoint().validate();

  if (this.subscriptions.length > 0) 
    for (index in this.subscriptions)
      if (this.subscriptions[index].equivalent(subscription))
        throw new exceptions.JSTPEndpointAlreadyBound(
          "The endpoint " + subscription.getEndpoint().toString() + " is already bound for that callback and context");

  this.subscriptions.push(subscription); 
}

/*
 * release( JSTPSubscription subscription )
 * ---------------------------------------------------------------------------
 *
 * If present, removes the subscription from the subscriptions table.
 *
 * Throws a JSTPUnboundEndpoint exception if the subscription matches nothing.
 *
 * #### Arguments
 *
 * - JSTPSubscription subscription
 *
 * #### Throws
 *
 * - JSTPUnboundEndpoint
 *
 */
JSTPSubscriptionManager.prototype.release = function (subscription) {
  var index = this.indexOf(subscription);

  if (index == -1)
    throw new exceptions.JSTPUnboundEndpoint(
      "The endpoint " + subscription.getEndpoint().toString() + " is not bound for that callback and context");

  this.subscriptions.splice(index, 1);
}

/*
 * indexOf( JSTPSubscription subscription )
 * ----------------------------------------
 *
 * Returns the index of the described subscription within the subscriptions table, 
 * if present.
 *
 * If not present, returns -1.
 *
 * #### Arguments
 *
 * - JSTPSubscription subscription
 *
 * #### Returns
 *
 * - Integer index
 *
 */
JSTPSubscriptionManager.prototype.indexOf = function (subscription) {
  var matches = false;
  var index   = 0;
  
  while (!matches && index < this.subscriptions.length) {
    if (this.subscriptions[index].equivalent(subscription))
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
 * Triggers all the Endpoints that match the dispatch matchable endpoint.
 * 
 * Upon finding a match, and if if has a Transaction ID set, gets a new
 * copy of the Dispatch with a Triggering ID assigned.
 *
 * If no endpoint matches this Dispatch, throws a JSTPNotFound.
 *
 * #### Arguments
 *
 * - JSTPDispatch dispatch
 *
 * #### Throws
 * 
 * - JSTPNotFound
 *
 */
JSTPSubscriptionManager.prototype.trigger = function (dispatch) {
  if (this.subscriptions.length == 0)
    throw new exceptions.JSTPNotFound("No Subscription matches that Dispatch");

  var missing = true;

  for (index in this.subscriptions) {
    if (this.subscriptions[index].getEndpoint().match(dispatch)) {
      missing = false;
      var triggeringPackage = new JSTPTriggeringPackage();
      triggeringPackage;
    }
  }

  if (missing) 
    throw new exceptions.JSTPNotFound("No Subscription matches that Dispatch");
}

module.exports = JSTPSubscriptionManager;