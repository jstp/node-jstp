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

function JSTPInvalidStatusCode(message) {
  this.name = "JSTPInvalidStatusCode";
  this.message = (message || "");
}

JSTPInvalidStatusCode.prototype = Object.create(Error);

function JSTPInvalidTokenHeaderDefinition(message) {
  this.name = "JSTPInvalidTokenHeaderDefinition";
  this.message = (message || "");
}

JSTPInvalidTokenHeaderDefinition.prototype = Object.create(Error);

function JSTPImpossibleToAnswer(message) {
  this.name = "JSTPImpossibleToAnswer";
  this.message = (message || "");
}

JSTPImpossibleToAnswer.prototype = Object.create(Error);

function JSTPInvalidBodyHeaderDefinition(message) {
  this.name = "JSTPInvalidBodyHeaderDefinition";
  this.message = (message || "");
}

JSTPInvalidBodyHeaderDefinition.prototype = Object.create(Error);

function JSTPInvalidToHeaderDefinition(message) {
  this.name = "JSTPInvalidToHeaderDefinition";
  this.message = (message || "");
}

JSTPInvalidToHeaderDefinition.prototype = Object.create(Error);

function JSTPInvalidEndpointHeaderDefinition(message) {
  this.name = "JSTPInvalidEndpointHeaderDefinition";
  this.message = (message || "");
}

JSTPInvalidEndpointHeaderDefinition.prototype = Object.create(Error);

function JSTPUnrecognizedProtocol(message) {
  this.name = "JSTPUnrecognizedProtocol";
  this.message = (message || "");
}

JSTPUnrecognizedProtocol.prototype = Object.create(Error);

function JSTPUnsupportedProtocolVersion(message) {
  this.name = "JSTPUnsupportedProtocolVersion";
  this.message = (message || "");
}

JSTPUnsupportedProtocolVersion.prototype = Object.create(Error);

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
  JSTPInvalidStatusCode: JSTPInvalidStatusCode,
  JSTPInvalidTokenHeaderDefinition: JSTPInvalidTokenHeaderDefinition,
  JSTPImpossibleToAnswer: JSTPImpossibleToAnswer,
  JSTPInvalidBodyHeaderDefinition: JSTPInvalidBodyHeaderDefinition,
  JSTPInvalidToHeaderDefinition: JSTPInvalidToHeaderDefinition,
  JSTPInvalidEndpointHeaderDefinition: JSTPInvalidEndpointHeaderDefinition,
  JSTPUnrecognizedProtocol: JSTPUnrecognizedProtocol,
  JSTPUnsupportedProtocolVersion: JSTPUnsupportedProtocolVersion,
}