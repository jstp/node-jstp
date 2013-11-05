var JSTPEndpoint = require('./endpoint')
  , JSTPDispatch = require('./dispatch')
  , JSTPTriggeringPackage = require('./triggering-package')
  , exceptions   = require('./exceptions');

var jstp = {

  // Models
  JSTPEndpoint: JSTPEndpoint,
  JSTPTriggeringPackage: JSTPTriggeringPackage,
  JSTPDispatch: JSTPDispatch,

  // Exceptions
  JSTPInvalidMethodPatternType: exceptions.JSTPInvalidMethodPatternType,
  JSTPInvalidResourcePatternType: exceptions.JSTPInvalidResourcePatternType,
  JSTPMissingMethodPatternInEndpoint: exceptions.JSTPMissingMethodPatternInEndpoint,
  JSTPMissingResourcePatternInEndpoint: exceptions.JSTPMissingResourcePatternInEndpoint,
  JSTPMissingEmitterInTriggeringPackage: exceptions.JSTPMissingEmitterInTriggeringPackage,
  JSTPInvalidProtocolHeaderDefinition: exceptions.JSTPInvalidProtocolHeaderDefinition,
  JSTPInvalidMethodHeaderDefinition: exceptions.JSTPInvalidMethodHeaderDefinition,
  JSTPInvalidResourceHeaderDefinition: exceptions.JSTPInvalidResourceHeaderDefinition,
  JSTPInvalidTimestampHeaderDefinition: exceptions.JSTPInvalidTimestampHeaderDefinition,
  JSTPInvalidArgumentForSetDispatch: exceptions.JSTPInvalidArgumentForSetDispatch,
  JSTPMissingDispatch: exceptions.JSTPMissingDispatch,

}

module.exports = jstp;