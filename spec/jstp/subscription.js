var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPSubscription').addBatch({
  '#getCallback()': {
  	'should return the callback': function () {
      var subscription = new jstp.JSTPSubscription();
      var callback = function () {};
      subscription.setCallback(callback);
      assert.equal(subscription.getCallback(), callback);
    }
  },
  '#setCallback( JSTPCallable )': {
  	'has #call method': {
    	'should set the callback': 'pending'
    },

    'misses #call method': {
      'should throw an error': 'pending'
    }
  },

  '#getContext()': 'pending',
  '#setContext( Object )': 'pending',
  
  '#getEndpoint()': 'pending',
  '#setEndpoint( JSTPEndpoint )': 'pending',

  '#getTransactionID()': 'pending',
  '#setTransactionID( String )': 'pending'
}).export(module); 