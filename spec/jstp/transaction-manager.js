var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

var helper = {
  engineStub: {
    dispatch: function () {
      this.dispatchWasCalled = true;
    }
  }
}

vows.describe('JSTPTransactionManager').addBatch({
  'new JSTPTransactionManager( JSTPEngine engine )': {
    'should set the engine property': function () {
      var transactionManager  = new jstp.JSTPTransactionManager(helper.engineStub);

      assert.equal(transactionManager.engine, helper.engineStub);
    },

    'should initialize the list object property': function () {
      var transactionManager  = new jstp.JSTPTransactionManager(helper.engineStub);

      assert.isObject(transactionManager.list);      
    }
  },

  '#start( JSTPDispatch dispatch )': {
    'the dispatch has no Transaction ID': {
      'should set the Transaction ID in the dispatch': function () {
        var dispatch            = new jstp.JSTPDispatch();
        var transactionManager  = new jstp.JSTPTransactionManager(helper.engineStub);

        transactionManager.start(dispatch);

        assert.isString(dispatch.getToken()[0]);
        assert.isTrue(dispatch.getToken()[0].length > 0);
      },

      'should set the timeout for the Transaction ID': function () {
        var dispatch            = new jstp.JSTPDispatch();
        var transactionManager  = new jstp.JSTPTransactionManager(helper.engineStub);
        var wasCalled           = false;
        setTimeout = function (callback, time) {
          wasCalled = true;
          assert.equal(time, 10000);
        }

        transactionManager.start(dispatch);
        assert.isTrue(wasCalled);
      },

      'should set the Transaction ID as a key to an Array in the list': function () {
        var dispatch            = new jstp.JSTPDispatch();
        var transactionManager  = new jstp.JSTPTransactionManager(helper.engineStub);

        transactionManager.start(dispatch);

        assert.isArray(transactionManager.list[dispatch.getToken()[0]]);
      },

      'should send the BIND ANSWER for the Transaction ID to the JSTPEngine': function () {
        var dispatch            = new jstp.JSTPDispatch();
        var engine              = {};
        var transactionManager  = new jstp.JSTPTransactionManager(engine);

        engine.dispatch = function (argDispatch, argCallback, argContext) {
          this.dispatchWasCalled = true;
          assert.equal(argDispatch.getMethod(), "BIND");
          var endpoint = argDispatch.getEndpoint();
          assert.equal(endpoint.getMethodPattern(), "ANSWER");
          assert.equal(endpoint.getResourcePattern()[0], "*");
          assert.equal(endpoint.getResourcePattern()[1], dispatch.getToken()[0]);
          assert.equal(endpoint.getResourcePattern()[2], "*");
        }

        transactionManager.start(dispatch);
        assert.isTrue(engine.dispatchWasCalled);
      },
    },

    'the dispatch has a Transaction ID': {
      'should keep the Transaction ID': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setToken(["transactionID"]);
        var engine = {};
        var transactionManager = new jstp.JSTPTransactionManager(engine);

        engine.dispatch = function (argDispatch, argCallback, argContext) {
          this.dispatchWasCalled = true;
          var endpoint = argDispatch.getEndpoint();
          assert.equal(endpoint.getResourcePattern()[1], "transactionID");
        }

        transactionManager.start(dispatch);
        assert.isTrue(engine.dispatchWasCalled);
      }
    },

    'the dispatch has a To Header': {
      'should add the To Header to the BIND ANSWER': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setTo(["melmak"]);
        var engine = {};
        var transactionManager = new jstp.JSTPTransactionManager(engine);

        engine.dispatch = function (argDispatch, argCallback, argContext) {
          this.dispatchWasCalled = true;
          assert.equal(argDispatch.getTo()[0], "melmak");
        }

        transactionManager.start(dispatch);
        assert.isTrue(engine.dispatchWasCalled);        
      }
    }

  },

  '#newWithTriggeringID( JSTPDispatch dispatch ): JSTPDispatch new': {
    'should return clone of the argument with the Triggering ID assigned': 'pending',
    'should add the Triggering ID to the Transaction ID list': 'pending'
  },

  '#received( JSTPDispatch answer )': {
    'should remove the Resource Triggering ID from the Transaction ID list': 'pending',
  },

  '#check( String transactionID )': {
    'if there are no Triggering IDs left in the list': {
      'should call #stop with the transactionID': 'pending'
    },

    'if there are Triggering IDs in the list': {
      'should not call #stop': 'pending'
    }
  },

  '#stop( String transactionID )': {
    'should remove the transactionID key from the list': 'pending',
  }
}).export(module);     