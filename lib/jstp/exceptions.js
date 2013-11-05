function JSTPInvalidMethodPatternType(message) {
  this.name = "JSTPInvalidMethodPatternType";
  this.message = (message || "");
}

JSTPInvalidMethodPatternType.prototype = Object.create(Error);

function JSTPInvalidResourcePatternType(message) {
  this.name = "JSTPInvalidResourcePatternType";
  this.message = (message || "");
}

JSTPInvalidResourcePatternType.prototype = Object.create(Error);

function JSTPMissingMethodPatternInEndpoint(message) {
  this.name = "JSTPMissingMethodPatternInEndpoint";
  this.message = (message || "");
}

JSTPMissingMethodPatternInEndpoint.prototype = Object.create(Error);

function JSTPMissingResourcePatternInEndpoint(message) {
  this.name = "JSTPMissingResourcePatternInEndpoint";
  this.message = (message || "");
}

JSTPMissingResourcePatternInEndpoint.prototype = Object.create(Error);

function JSTPMissingEmitterInTriggeringPackage(message) {
  this.name = "JSTPMissingEmitterInTriggeringPackage";
  this.message = (message || "");
}

JSTPMissingEmitterInTriggeringPackage.prototype = Object.create(Error);

function JSTPInvalidProtocolHeaderDefinition(message) {
  this.name = "JSTPInvalidProtocolHeaderDefinition";
  this.message = (message || "");
}

JSTPInvalidProtocolHeaderDefinition.prototype = Object.create(Error);

function JSTPInvalidMethodHeaderDefinition(message) {
  this.name = "JSTPInvalidMethodHeaderDefinition";
  this.message = (message || "");
}

JSTPInvalidMethodHeaderDefinition.prototype = Object.create(Error);

function JSTPInvalidResourceHeaderDefinition(message) {
  this.name = "JSTPInvalidResourceHeaderDefinition";
  this.message = (message || "");
}

JSTPInvalidResourceHeaderDefinition.prototype = Object.create(Error);

function JSTPInvalidTimestampHeaderDefinition(message) {
  this.name = "JSTPInvalidTimestampHeaderDefinition";
  this.message = (message || "");
}

JSTPInvalidTimestampHeaderDefinition.prototype = Object.create(Error);

function JSTPInvalidArgumentForSetDispatch(message) {
  this.name = "JSTPInvalidArgumentForSetDispatch";
  this.message = (message || "");
}

JSTPInvalidArgumentForSetDispatch.prototype = Object.create(Error);

function JSTPMissingDispatch(message) {
  this.name = "JSTPMissingDispatch";
  this.message = (message || "");
}

JSTPMissingDispatch.prototype = Object.create(Error);

function JSTPNotADispatch(message) {
  this.name = "JSTPNotADispatch";
  this.message = (message || "");
}

JSTPNotADispatch.prototype = Object.create(Error);

function JSTPInvalidFromHeaderDefinition(message) {
  this.name = "JSTPInvalidFromHeaderDefinition";
  this.message = (message || "");
}

JSTPInvalidFromHeaderDefinition.prototype = Object.create(Error);

function JSTPNotCallable(message) {
  this.name = "JSTPNotCallable";
  this.message = (message || "");
}

JSTPNotCallable.prototype = Object.create(Error);

function JSTPMissingStatusCode(message) {
  this.name = "JSTPMissingStatusCode";
  this.message = (message || "");
}

JSTPMissingStatusCode.prototype = Object.create(Error);

module.exports = {
  JSTPInvalidMethodPatternType: JSTPInvalidMethodPatternType,
  JSTPInvalidResourcePatternType: JSTPInvalidResourcePatternType,
  JSTPMissingMethodPatternInEndpoint: JSTPMissingMethodPatternInEndpoint,
  JSTPMissingResourcePatternInEndpoint: JSTPMissingResourcePatternInEndpoint,
  JSTPMissingEmitterInTriggeringPackage: JSTPMissingEmitterInTriggeringPackage,
  JSTPInvalidProtocolHeaderDefinition: JSTPInvalidProtocolHeaderDefinition,
  JSTPInvalidMethodHeaderDefinition: JSTPInvalidMethodHeaderDefinition,
  JSTPInvalidResourceHeaderDefinition: JSTPInvalidResourceHeaderDefinition,
  JSTPInvalidTimestampHeaderDefinition: JSTPInvalidTimestampHeaderDefinition,
  JSTPInvalidArgumentForSetDispatch: JSTPInvalidArgumentForSetDispatch,
  JSTPMissingDispatch: JSTPMissingDispatch,
  JSTPNotADispatch: JSTPNotADispatch,
  JSTPInvalidFromHeaderDefinition: JSTPInvalidFromHeaderDefinition,
  JSTPNotCallable: JSTPNotCallable,
  JSTPMissingStatusCode: JSTPMissingStatusCode,
}