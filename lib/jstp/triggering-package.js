var exceptions = require("./exceptions");

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

module.exports = JSTPTriggeringPackage;