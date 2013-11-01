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