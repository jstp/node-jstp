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