var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPEngine').addBatch({
  '#dispatch': {
    '( JSTPDispatch dispatch )': {
      'should do processing': 'pending'
    },

    '( JSTPDispatch dispatch, JSTPCallback callback )': {
      'should do processing': 'pending'      
    },

    '( JSTPDispatch dispatch, JSTPCallback callback, Object context )': {
      'should do processing': 'pending'      
    }
  }
}).export(module); 