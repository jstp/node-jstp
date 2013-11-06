var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPSubscriptionManager').addBatch({
  '#bind( JSTPDispatch dispatch, JSTPCallable callback, Object context )': 'pending',
  '#release( JSTPDispatch dispatch, JSTPCallable callback, Object context )': 'pending',
  '#trigger( JSTPDispatch )': 'pending'
}).export(module);     