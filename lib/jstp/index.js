var JSTPEndpoint = require('./endpoint')
  , JSTPDispatch = require('./dispatch')
  , JSTPTriggeringPackage = require('./triggering-package')
  , JSTPTransactionManager = require('./transaction-manager')
  , JSTPSubscriptionManager = require('./subscription-manager')
  , JSTPPatternComparer = require('./pattern-comparer')
  , exceptions   = require('./exceptions');

var jstp = {

  // Models External API
  JSTPEndpoint: JSTPEndpoint,
  JSTPTriggeringPackage: JSTPTriggeringPackage,
  JSTPDispatch: JSTPDispatch,

  // Services
  JSTPTransactionManager: JSTPTransactionManager,
  JSTPSubscriptionManager: JSTPSubscriptionManager,
  JSTPPatternComparer: JSTPPatternComparer,

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
  JSTPInvalidResourceHeaderForAnswer: exceptions.JSTPInvalidResourceHeaderForAnswer,
  JSTPInvalidToInAnswer: exceptions.JSTPInvalidToInAnswer,
  JSTPMissingEndpointInSubscription: exceptions.JSTPMissingEndpointInSubscription,
  JSTPInvalidResourceInSubscription: exceptions.JSTPInvalidResourceInSubscription,
  JSTPInvalidEndpointInRegular: exceptions.JSTPInvalidEndpointInRegular,
  JSTPMissingResourceInRegular: exceptions.JSTPMissingResourceInRegular,
  JSTPMissingMethodHeader: exceptions.JSTPMissingMethodHeader,
  JSTPInvalidFromPatternType: exceptions.JSTPInvalidFromPatternType,
  JSTPInvalidToPatternType: exceptions.JSTPInvalidToPatternType,
  JSTPNotAnEndpoint: exceptions.JSTPNotAnEndpoint,
  JSTPMissingTransactionID: exceptions.JSTPMissingTransactionID,
  JSTPEndpointAlreadyBound: exceptions.JSTPEndpointAlreadyBound,
  JSTPUnboundEndpoint: exceptions.JSTPUnboundEndpoint,
  JSTPInvalidSyntaxForPattern: exceptions.JSTPInvalidSyntaxForPattern,
}

module.exports = jstp;