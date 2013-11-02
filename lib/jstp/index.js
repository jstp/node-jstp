var JSTPEndpoint = require('./endpoint')
  , JSTPTriggeringPackage = require('./triggering-package')
  , exceptions   = require('./exceptions');

var jstp = {

  // Models
  JSTPEndpoint: JSTPEndpoint,
  JSTPTriggeringPackage: JSTPTriggeringPackage,

  // Exceptions
  JSTPInvalidMethodPatternType: exceptions.JSTPInvalidMethodPatternType,
  JSTPInvalidResourcePatternType: exceptions.JSTPInvalidResourcePatternType,
  JSTPMissingMethodPatternInEndpoint: exceptions.JSTPMissingMethodPatternInEndpoint,
  JSTPMissingResourcePatternInEndpoint: exceptions.JSTPMissingResourcePatternInEndpoint,

}

module.exports = jstp;