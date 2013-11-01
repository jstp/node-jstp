var JSTPEndpoint = require('./endpoint')
  , exceptions   = require('./exceptions');

var jstp = {

  // Models
  JSTPEndpoint: JSTPEndpoint,

  // Exceptions
  JSTPInvalidMethodPatternType: exceptions.JSTPInvalidMethodPatternType,
  JSTPInvalidResourcePatternType: exceptions.JSTPInvalidResourcePatternType,
  JSTPMissingMethodPatternInEndpoint: exceptions.JSTPMissingMethodPatternInEndpoint,
  JSTPMissingResourcePatternInEndpoint: exceptions.JSTPMissingResourcePatternInEndpoint,

}

module.exports = jstp;