function JSTPInvalidMethodPatternType(message) {
  this.name = "NotImplementedError";
  this.message = (message || "");
}

JSTPInvalidMethodPatternType.prototype = Object.create(Error);

function JSTPInvalidResourcePatternType(message) {
  this.name = "NotImplementedError";
  this.message = (message || "");
}

JSTPInvalidResourcePatternType.prototype = Object.create(Error);

function JSTPMissingMethodPatternInEndpoint(message) {
  this.name = "NotImplementedError";
  this.message = (message || "");
}

JSTPMissingMethodPatternInEndpoint.prototype = Object.create(Error);

function JSTPMissingResourcePatternInEndpoint(message) {
  this.name = "NotImplementedError";
  this.message = (message || "");
}

JSTPMissingResourcePatternInEndpoint.prototype = Object.create(Error);

function JSTPMissingEmitterInTriggeringPackage(message) {
  this.name = "NotImplementedError";
  this.message = (message || "");
}

JSTPMissingEmitterInTriggeringPackage.prototype = Object.create(Error);

function JSTPInvalidProtocolHeaderDefinition(message) {
  this.name = "NotImplementedError";
  this.message = (message || "");
}

JSTPInvalidProtocolHeaderDefinition.prototype = Object.create(Error);

function JSTPInvalidMethodHeaderDefinition(message) {
  this.name = "NotImplementedError";
  this.message = (message || "");
}

JSTPInvalidMethodHeaderDefinition.prototype = Object.create(Error);

function JSTPInvalidResourceHeaderDefinition(message) {
  this.name = "NotImplementedError";
  this.message = (message || "");
}

JSTPInvalidResourceHeaderDefinition.prototype = Object.create(Error);

function JSTPInvalidTimestampHeaderDefinition(message) {
  this.name = "NotImplementedError";
  this.message = (message || "");
}

JSTPInvalidTimestampHeaderDefinition.prototype = Object.create(Error);

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
}