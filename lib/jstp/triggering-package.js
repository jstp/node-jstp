var exceptions    = require("./exceptions")
  , JSTPDispatch  = require("./dispatch");

/* 
 * JSTPTriggeringPackage
 * ============
 * 
 * An object wrapper of the message as sent to the callbacks, 
 * once an endpoint is triggered in the Engine.
 * 
 */
function JSTPTriggeringPackage(engine, currentEmitter) {
  if (currentEmitter == null || currentEmitter == "" || typeof currentEmitter != "string") {
    throw new exceptions.JSTPMissingEmitterInTriggeringPackage("Missing emitter identifier");
  }
  this.engine         = engine;
  this.currentEmitter = currentEmitter;
  this.answer         = null;
  this.dispatch       = null;
}

/*
 * getEngine()
 * -----------
 *
 * Returns the JSTPEngine assigned that triggered the endpoint.
 * 
 * #### Returns
 *
 * - JSTPEngine engine
 * 
 */
JSTPTriggeringPackage.prototype.getEngine = function () {
  return this.engine;
}

/*
 * getCurrentEmitter()
 * -------------------
 *
 * Returns the current emitter label.
 *
 * #### Returns
 *
 * - String currentEmitter
 *
 */
JSTPTriggeringPackage.prototype.getCurrentEmitter = function () {
  return this.currentEmitter;
}

/*
 * setDispatch( JSTPDispatch dispatch )
 * ------------------------------------
 *
 * Sets the `JSTPDispatch` to be sent to the `JSTPCallback` in the package.
 * 
 * If the dispatch is of the Regular or Subscription Morphologies,
 * it would be retrievable via the `getDispatch()` method. If the dispatch
 * is of the Answer Morphology, it would be retrievable via the `getAnswer()`
 * method.
 *
 * Throws an exception if the argument is not a valid JSTPDispatch. It also
 * calls the `validate()` method on the argument dispatch, so any malformation
 * in the argument dispatch will throw an exception that will be propagated.
 *
 * #### Arguments
 *
 * - JSTPDispatch dispatch
 *
 * #### Throws
 *
 * - JSTPInvalidArgumentForSetDispatch
 *
 */
JSTPTriggeringPackage.prototype.setDispatch = function (dispatch) {
  if (!(dispatch instanceof JSTPDispatch))
    throw new exceptions.JSTPInvalidArgumentForSetDispatch(
      "Invalid argument for setDispatch: must be a JSTPDispatch");

  dispatch.validate();

  if (dispatch.isOfAnswerMorphology())
    this.answer = dispatch;
  else
    this.dispatch = dispatch;

  return this;
}

/*
 * getDispatch()
 * -------------
 *
 * Returns the `JSTPDispatch` set for this package, if any. 
 *
 * It returns null both if no `JSTPDispatch` has been set of if the 
 * `JSTPDispatch` is of the Answer Morphology.
 *
 * #### Returns
 *
 * - JSTPDispatch dispatch
 *
 */
JSTPTriggeringPackage.prototype.getDispatch = function () {
  return this.dispatch;
}

/*
 * getAnswer()
 * -------------
 *
 * Returns the answer `JSTPDispatch` set for this package, if any. 
 *
 * It returns null both if no `JSTPDispatch` has been set of if the 
 * `JSTPDispatch` is of the Regular or Subscription Morphologies.
 *
 * #### Returns
 *
 * - JSTPDispatch answer
 *
 */
JSTPTriggeringPackage.prototype.getAnswer = function () {
  return this.answer;
}

module.exports = JSTPTriggeringPackage;