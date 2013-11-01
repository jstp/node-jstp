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

module.exports = {
  JSTPInvalidMethodPatternType: JSTPInvalidMethodPatternType,
  JSTPInvalidResourcePatternType: JSTPInvalidResourcePatternType,
  JSTPMissingMethodPatternInEndpoint: JSTPMissingMethodPatternInEndpoint,
  JSTPMissingResourcePatternInEndpoint: JSTPMissingResourcePatternInEndpoint,
}