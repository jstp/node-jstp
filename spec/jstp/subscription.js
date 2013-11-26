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
    	'should set the callback': function () {
        var subscription = new jstp.JSTPSubscription();
        var callback = function () {};
        subscription.setCallback(callback);
        assert.equal(subscription.getCallback(), callback);        
      }
    },

    'misses #call method': {
      'should throw an error': function () {
        assert.throws(function () {
          new jstp.JSTPSubscription().setCallback({});
        }, Error);
      }
    }
  },

  '#getContext()': {
    'should return the context': function () {
      var subscription = new jstp.JSTPSubscription();
      var context = {};
      subscription.setContext(context);
      assert.equal(subscription.getContext(), context);
    }
  },
  '#setContext( Object )': {
    'should set the context': function () {
      var subscription = new jstp.JSTPSubscription();
      var context = {};
      subscription.setContext(context);
      assert.equal(subscription.getContext(), context);
    }
  },
  
  '#getEndpoint()': {
    'should return the endpoint': function () {
      var subscription = new jstp.JSTPSubscription();
      var endpoint = new jstp.JSTPEndpoint();
      subscription.setEndpoint(endpoint);
      assert.equal(subscription.getEndpoint(), endpoint);
    }
  },

  '#setEndpoint( JSTPEndpoint )': {
    'is JSTPEndpoint': {
      'should set the endpoint': function () {
        var subscription = new jstp.JSTPSubscription();
        var endpoint = new jstp.JSTPEndpoint();
        subscription.setEndpoint(endpoint);
        assert.equal(subscription.getEndpoint(), endpoint);        
      }      
    },

    'is not JSTPEndpoint': {
      'should throw an Error': function () {
        assert.throws(function () {
          new jstp.JSTPSubscription().setEndpoint({});
        }, Error); 
      } 
    }
  },

  '#getTransactionID()': {
    'should get the transactionID': function () {
      var subscription = new jstp.JSTPSubscription();
      var transactionID = "transactionID";
      subscription.setTransactionID(transactionID);
      assert.equal(subscription.getTransactionID(), transactionID);
    }
  },
  
  '#setTransactionID( String )': {
    'should set the transactionID': function () {
      var subscription = new jstp.JSTPSubscription();
      var transactionID = "transactionID";
      subscription.setTransactionID(transactionID);
      assert.equal(subscription.getTransactionID(), transactionID);
    }
  }
}).export(module); 