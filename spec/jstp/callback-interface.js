var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPCallbackInterface').addBatch({
  '#call( JSTPEngine engine, JSTPTriggeringPackage triggeringPackage )': {
    'should accept the arguments': function () { }
  }
}).export(module); 