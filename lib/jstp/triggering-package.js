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
  this.theAnswer      = null;
  this.theDispatch    = null;
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
 * Sets the `JSTPDispatch` to be sent to the `JSTPCallable` in the package.
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
    this.theAnswer = dispatch;
  else
    this.theDispatch = dispatch;

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
  return this.theDispatch;
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
  return this.theAnswer;
}

/*
 * dispatch( JSTPDispatch dispatch [, JSTPCallable callback [, Object context ] ])
 * -------------------------------------------------------------------------------
 *
 * Sets the From Header accordingly and forward the arguments to the engine's 
 * `dispatch` method. Throws an error if no argument or invalid arguments are passed.
 *
 * #### Arguments
 * - JSTPDispatch dispatch
 * - _optional_ JSTPCallable callback
 * - _optional_ Object context
 *
 * #### Throws
 *
 * - JSTPMissingDispatch
 * - JSTPInvalidArgumentForDispatch
 * - JSTPNotCallable
 *
 */
JSTPTriggeringPackage.prototype.dispatch = function (dispatch, callback, context) {
  if (!dispatch)
    throw new exceptions.JSTPMissingDispatch(
      "Missing the required argument dispatch");

  if (!(dispatch instanceof JSTPDispatch))
    throw new exceptions.JSTPNotADispatch(
      "The argument must be a JSTPDispatch");

  if (callback != null && typeof callback.call != "function")
    throw new exceptions.JSTPNotCallable(
      "The callback must have the #call method");

  dispatch.getFrom().unshift(this.currentEmitter);

  this.engine.dispatch(dispatch, callback, context);

}

module.exports = JSTPTriggeringPackage;