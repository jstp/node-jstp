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
  JSTPNotADispatch: exceptions.JSTPNotADispatch,
  JSTPInvalidFromHeaderDefinition: exceptions.JSTPInvalidFromHeaderDefinition,
  JSTPNotCallable: exceptions.JSTPNotCallable,
  JSTPMissingStatusCode: exceptions.JSTPMissingStatusCode,
  JSTPInvalidStatusCode: exceptions.JSTPInvalidStatusCode,
  JSTPInvalidTokenHeaderDefinition: exceptions.JSTPInvalidTokenHeaderDefinition,
  JSTPImpossibleToAnswer: exceptions.JSTPImpossibleToAnswer,
  JSTPInvalidBodyHeaderDefinition: exceptions.JSTPInvalidBodyHeaderDefinition,
  JSTPInvalidToHeaderDefinition: exceptions.JSTPInvalidToHeaderDefinition,
  JSTPInvalidEndpointHeaderDefinition: exceptions.JSTPInvalidEndpointHeaderDefinition,
  JSTPUnrecognizedProtocol: exceptions.JSTPUnrecognizedProtocol,
  JSTPUnsupportedProtocolVersion: exceptions.JSTPUnsupportedProtocolVersion,
  JSTPInvalidEndpointInAnswer: exceptions.JSTPInvalidEndpointInAnswer,
}

module.exports = jstp;