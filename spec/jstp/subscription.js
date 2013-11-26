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
  },

  '#equivalent': {
    'the endpoint is equivalent and the callback and context are the same': {
      'should return true': function () {
        var firstEndpoint = new jstp.JSTPEndpoint()
            .setMethodPattern("PUT")
            .setFromPattern(["lala"])
            .setResourcePattern(["*"]);
        var callback = function () {};
        var context  = {};
        var first = new jstp.JSTPSubscription()
            .setEndpoint(firstEndpoint)
            .setCallback(callback)
            .setContext(context);
        var secondEndpoint = new jstp.JSTPEndpoint()
            .setMethodPattern("PUT")
            .setFromPattern(["lala"])
            .setResourcePattern(["*"]);    
        var second = new jstp.JSTPSubscription()
            .setEndpoint(secondEndpoint)
            .setCallback(callback)
            .setContext(context);

        assert.isTrue(first.equivalent(second));
      }
    },

    'the endpoint is not equivalent': {
      'should return false': function () {
        var firstEndpoint = new jstp.JSTPEndpoint()
            .setMethodPattern("PUT")
            .setFromPattern(["lala"])
            .setResourcePattern(["*"]);
        var callback = function () {};
        var context  = {};
        var first = new jstp.JSTPSubscription()
            .setEndpoint(firstEndpoint)
            .setCallback(callback)
            .setContext(context);
        var secondEndpoint = new jstp.JSTPEndpoint()
            .setMethodPattern("PUT")
            .setFromPattern(["lala"])
            .setResourcePattern(["..."]);    
        var second = new jstp.JSTPSubscription()
            .setEndpoint(secondEndpoint)
            .setCallback(callback)
            .setContext(context);

        assert.isFalse(first.equivalent(second));        
      }
    },

    'the callback is not the same': {
      'should return false': function () {
        var firstEndpoint = new jstp.JSTPEndpoint()
            .setMethodPattern("PUT")
            .setFromPattern(["lala"])
            .setResourcePattern(["*"]);
        var callback  = function () {};
        var callback2 = function () {};
        var context  = {};
        var first = new jstp.JSTPSubscription()
            .setEndpoint(firstEndpoint)
            .setCallback(callback)
            .setContext(context);
        var secondEndpoint = new jstp.JSTPEndpoint()
            .setMethodPattern("PUT")
            .setFromPattern(["lala"])
            .setResourcePattern(["*"]);    
        var second = new jstp.JSTPSubscription()
            .setEndpoint(secondEndpoint)
            .setCallback(callback2)
            .setContext(context);

        assert.isFalse(first.equivalent(second));        
      }
    },

    'the context is not the same': {
      'should return false': function () {
        var firstEndpoint = new jstp.JSTPEndpoint()
            .setMethodPattern("PUT")
            .setFromPattern(["lala"])
            .setResourcePattern(["*"]);
        var callback = function () {};
        var context    = {};
        var context2   = {};
        var first = new jstp.JSTPSubscription()
            .setEndpoint(firstEndpoint)
            .setCallback(callback)
            .setContext(context);
        var secondEndpoint = new jstp.JSTPEndpoint()
            .setMethodPattern("PUT")
            .setFromPattern(["lala"])
            .setResourcePattern(["*"]);    
        var second = new jstp.JSTPSubscription()
            .setEndpoint(secondEndpoint)
            .setCallback(callback)
            .setContext(context2);

        assert.isFalse(first.equivalent(second));        
      }
    }
  }
}).export(module); 