var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPInvalidMethodPatternType').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidMethodPatternType);
  }
}).export(module); 

vows.describe('JSTPInvalidResourcePatternType').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidResourcePatternType);
  }
}).export(module); 

vows.describe('JSTPMissingMethodPatternInEndpoint').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPMissingMethodPatternInEndpoint);
  }
}).export(module);  

vows.describe('JSTPMissingResourcePatternInEndpoint').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPMissingResourcePatternInEndpoint);
  }
}).export(module); 

vows.describe('JSTPMissingEmitterInTriggeringPackage').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPMissingEmitterInTriggeringPackage);
  }
}).export(module); 

vows.describe('JSTPInvalidProtocolHeaderDefinition').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidProtocolHeaderDefinition);
  }
}).export(module); 

vows.describe('JSTPInvalidResourceHeaderDefinition').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidResourceHeaderDefinition);
  }
}).export(module); 

vows.describe('JSTPInvalidTimestampHeaderDefinition').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidTimestampHeaderDefinition);
  }
}).export(module); 

vows.describe('JSTPInvalidArgumentForSetDispatch').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidArgumentForSetDispatch);
  }
}).export(module); 

vows.describe('JSTPMissingDispatch').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPMissingDispatch);
  }
}).export(module); 

vows.describe('JSTPNotADispatch').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPNotADispatch);
  }
}).export(module); 

vows.describe('JSTPInvalidFromHeaderDefinition').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidFromHeaderDefinition);
  }
}).export(module); 

vows.describe('JSTPNotCallable').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPNotCallable);
  }
}).export(module); 

vows.describe('JSTPMissingStatusCode').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPMissingStatusCode);
  }
}).export(module); 

vows.describe('JSTPInvalidStatusCode').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidStatusCode);
  }
}).export(module); 

vows.describe('JSTPInvalidTokenHeaderDefinition').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidTokenHeaderDefinition);
  }
}).export(module); 

vows.describe('JSTPImpossibleToAnswer').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPImpossibleToAnswer);
  }
}).export(module); 

vows.describe('JSTPInvalidBodyHeaderDefinition').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidBodyHeaderDefinition);
  }
}).export(module); 

vows.describe('JSTPInvalidToHeaderDefinition').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidToHeaderDefinition);
  }
}).export(module); 

vows.describe('JSTPInvalidEndpointHeaderDefinition').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidEndpointHeaderDefinition);
  }
}).export(module); 

vows.describe('JSTPUnrecognizedProtocol').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPUnrecognizedProtocol);
  }
}).export(module); 

vows.describe('JSTPUnsupportedProtocolVersion').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPUnsupportedProtocolVersion);
  }
}).export(module); 

vows.describe('JSTPInvalidEndpointInAnswer').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidEndpointInAnswer);
  }
}).export(module); 

vows.describe('JSTPInvalidResourceHeaderForAnswer').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidResourceHeaderForAnswer);
  }
}).export(module); 

vows.describe('JSTPInvalidToInAnswer').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidToInAnswer);
  }
}).export(module); 

vows.describe('JSTPMissingEndpointInSubscription').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPMissingEndpointInSubscription);
  }
}).export(module); 

vows.describe('JSTPInvalidResourceInSubscription').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidResourceInSubscription);
  }
}).export(module); 

vows.describe('JSTPInvalidEndpointInRegular').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidEndpointInRegular);
  }
}).export(module); 

vows.describe('JSTPMissingResourceInRegular').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPMissingResourceInRegular);
  }
}).export(module); 

vows.describe('JSTPMissingMethodHeader').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPMissingMethodHeader);
  }
}).export(module); 

vows.describe('JSTPInvalidFromPatternType').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidFromPatternType);
  }
}).export(module); 

vows.describe('JSTPInvalidToPatternType').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPInvalidToPatternType);
  }
}).export(module); 

vows.describe('JSTPNotAnEndpoint').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPNotAnEndpoint);
  }
}).export(module); 

vows.describe('JSTPMissingTransactionID').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPMissingTransactionID);
  }
}).export(module); 

vows.describe('JSTPEndpointAlreadyBound').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPEndpointAlreadyBound);
  }
}).export(module); 

vows.describe('JSTPUnboundEndpoint').addBatch({
  'should exist': function () {
    assert.isFunction(jstp.JSTPUnboundEndpoint);
  }
}).export(module); 