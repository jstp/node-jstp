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