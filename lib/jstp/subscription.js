var JSTPEndpoint = require("./endpoint");

/*
 * JSTPSubscription
 * ================
 *
 * Property object for subscription encapsulation. 
 *
 * Contains:
 *
 * - JSTPEndpoint endpoint
 * - Object context
 * - JSTPCallable callback
 * - String transactionID
 *
 */
function JSTPSubscription() {
  this.endpoint = null;  
  this.context = null;  
  this.callback = null;  
  this.transactionID = null;  
}

/*
 * setCallback( JSTPCallable )
 * ---------------------------
 *
 * Sets the callback. If the argument has no #call method, throws
 * an Error.
 *
 * #### Arguments
 *
 * - JSTPCallable callback
 *
 * #### Throws
 *
 * - Error
 *
 */
JSTPSubscription.prototype.setCallback = function (callback) {
  if (!callback.call || !(callback.call instanceof Function)) 
    throw new Error("The callback should have a .call method");
  this.callback = callback;

  return this;
}

/*
 * getCallback()
 * -------------
 *
 * Gets the callback.
 *
 * #### Returns
 *
 * - JSTPCallable callback
 *
 */
JSTPSubscription.prototype.getCallback = function () {
  return this.callback;
}

/*
 * setContext( Object )
 * --------------------
 *
 * Sets the context
 *
 * #### Arguments
 *
 * - Object context
 *
 */
JSTPSubscription.prototype.setContext = function (context) {
  this.context = context;

  return this;
}

/*
 * getContext()
 * ------------
 *
 * Gets the context
 *
 * #### Returns
 *
 * - Object context
 *
 */
JSTPSubscription.prototype.getContext = function() {
  return this.context;
}

/*
 * setEndpoint( JSTPEndpoint )
 * ---------------------------
 *
 * Sets the endpoint. If the argument is not a JSTPEndpoint, throws
 * an Error.
 *
 * #### Arguments
 *
 * - JSTPEndpoint endpoint
 *
 * #### Throws
 *
 * - Error
 *
 */
JSTPSubscription.prototype.setEndpoint = function (endpoint) {
  if (!(endpoint instanceof JSTPEndpoint)) 
    throw new Error("The argument must be a JSTPEndpoint");
  this.endpoint = endpoint;

  return this;
}

/*
 * getEndpoint()
 * -------------
 *
 * Gets the endpoint.
 *
 * #### Returns
 *
 * - JSTPEndpoint endpoint
 *
 */
JSTPSubscription.prototype.getEndpoint = function () {
  return this.endpoint;
}

/*
 * setTransactionID( transactionID )
 * ---------------------------------
 *
 * Sets the transactionID.
 *
 * #### Arguments
 *
 * - String transactionID
 *
 */
JSTPSubscription.prototype.setTransactionID = function (transactionID) {
  this.transactionID = transactionID;

  return this;
}

/*
 * getTransactionID()
 * ------------
 *
 * Gets the transactionID
 *
 * #### Returns
 *
 * - String transactionID
 *
 */
JSTPSubscription.prototype.getTransactionID = function() {
  return this.transactionID;
}

/*
 * equivalent( JSTPSubscription )
 * ------------------------------
 *
 * Returns true if the callback and context are the same
 * and the endpoint is equivalent.
 *
 * False otherwise.
 *
 * #### Returns
 *
 * - Boolean isEquivalent
 *
 */
JSTPSubscription.prototype.equivalent = function(subscription) {
  return subscription.getEndpoint().equivalent(this.endpoint) &&
    subscription.getCallback() == this.callback &&
    subscription.getContext() == this.context; 
} 

module.exports = JSTPSubscription;