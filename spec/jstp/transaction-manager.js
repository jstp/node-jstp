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

  '#newWithTriggeringID( JSTPDispatch dispatch )': {
    'the Transaction ID is set and in the list': {
      topic: function () {
        var engine = {
          dispatch: function () {

          }
        };
        var transactionManager = new jstp.JSTPTransactionManager(engine);
        var oldDispatch = new jstp.JSTPDispatch();
        transactionManager.start(oldDispatch);
        return transactionManager
      },

      'should return clone of the argument with the Triggering ID assigned': function (transactionManager) {
        var source = new jstp.JSTPDispatch();
        source.setMethod("POST");
        source.setResource(["spider"]);
        source.setTimestamp(new Date().getTime());
        source.setTo(['the moon']);
        source.setFrom(['Buenos Aires']);

        source.setToken([Object.keys(transactionManager.list)[0]]);

        var clone = transactionManager.newWithTriggeringID( source );
        assert.equal(clone.getMethod(), "POST");
        assert.equal(clone.getResource()[0], "spider");
        assert.equal(clone.getToken()[0], source.getToken()[0]);
        assert.isString(clone.getToken()[1]);
        assert.equal(clone.getTo()[0], "the moon");
        assert.equal(clone.getFrom()[0], "Buenos Aires");
      },

      'should add the Triggering ID to the Transaction ID list': function (transactionManager) {
        var source = new jstp.JSTPDispatch();
        var endpoint = new jstp.JSTPEndpoint().setResourcePattern(["spider"]);
        source.setMethod("BIND");
        source.setEndpoint(endpoint);
        source.setTimestamp(new Date().getTime());
        source.setTo(['the moon']);
        source.setFrom(['Buenos Aires']);

        source.setToken([Object.keys(transactionManager.list)[0]]);

        var clone = transactionManager.newWithTriggeringID( source );
        assert.equal(clone.getMethod(), "BIND");
        assert.equal(clone.getEndpoint().getResourcePattern()[0], "spider");
        assert.equal(clone.getToken()[0], source.getToken()[0]);
        assert.isString(clone.getToken()[1]);
        assert.equal(clone.getTo()[0], "the moon");
        assert.equal(clone.getFrom()[0], "Buenos Aires");
        assert.include(transactionManager.list[clone.getToken()[0]], clone.getToken()[1]);
      }
    }
  },

  '#received( JSTPDispatch answer )': {
    'the Transaction and Triggering IDs were loaded': {
      'should remove the Resource Triggering ID from the Transaction ID list': function () {
        var engine = {dispatch: function () {}}
        var dispatch = new jstp.JSTPDispatch();
        var transactionManager = new jstp.JSTPTransactionManager(engine);
        transactionManager.start(dispatch);
        var transactionID = Object.keys(transactionManager.list)[0];
        var triggeringDispatch = new jstp.JSTPDispatch().setToken([transactionID]);
        var cloneWithTriggeringID = transactionManager.newWithTriggeringID(triggeringDispatch);

        var answer = new jstp.JSTPDispatch();
        answer.setMethod("ANSWER");
        answer.setResource(
          [300, cloneWithTriggeringID.getToken()[0], cloneWithTriggeringID.getToken()[1]]);

        transactionManager.received(answer);
        assert.isTrue(
          transactionManager.list[transactionID]
            .indexOf(cloneWithTriggeringID.getToken()[1]) == -1);

      }      
    }
  },

  '#check( String transactionID )': {
    'if there are no Triggering IDs left in the list': {
      'should call #stop with the transactionID': function () {
        var transactionManager = new jstp.JSTPTransactionManager({});
        transactionManager.list["here"] = [];
        transactionManager.stop = function (transactionID) {
          this.stopWasCalled = true;
          assert.equal(transactionID, "here");
        }
        transactionManager.check("here");
        assert.isTrue(transactionManager.stopWasCalled);
      }
    },

    'if there are Triggering IDs in the list': {
      'should not call #stop': function () {
        var transactionManager = new jstp.JSTPTransactionManager({});
        transactionManager.list["here"] = ["Triggering"];
        transactionManager.stop = function (transactionID) {
          this.stopWasCalled = true;
          assert.equal(transactionID, "here");
        }
        transactionManager.check("here");
        assert.isUndefined(transactionManager.stopWasCalled);        
      }
    }
  },

  '#stop( String transactionID )': {
    'should remove the transactionID key from the list': function () {
      var transactionManager = new jstp.JSTPTransactionManager({ dispatch: function () {} });
      transactionManager.list["here"] = ["Triggering"];
      transactionManager.stop("here");
      assert.isUndefined(transactionManager.list["here"]);       
    },

    'should send the 101 No More Answers answer to the JSTPEngine': function () {
      var mockEngine = {
        dispatch: function (dispatch) {
          this.dispatchWasCalled = this.dispatchWasCalled ? this.dispatchWasCalled + 1 : 1;
          if (this.dispatchWasCalled == 1) {
            assert.equal(dispatch.getResource()[0], 101);
            assert.equal(dispatch.getResource()[1], "here");
          }
        }
      };
      var transactionManager = new jstp.JSTPTransactionManager(mockEngine);
      transactionManager.list["here"] = ["triggers"];
      transactionManager.stop("here");

      assert.isUndefined(transactionManager.list["here"]);
      assert.isTrue(mockEngine.dispatchWasCalled > 1);
    },

    'should send the RELEASE ANSWER for the Transaction ID to the JSTPEngine': function () {
      var mockEngine = {
        dispatch: function (dispatch) {
          this.dispatchWasCalled = this.dispatchWasCalled ? this.dispatchWasCalled + 1 : 1;
          if (this.dispatchWasCalled == 2) {
            assert.equal(dispatch.getMethod(), "RELEASE");
            var endpoint = dispatch.getEndpoint();
            var resourcePattern = endpoint.getResourcePattern();
            assert.equal(resourcePattern[0], "*");
            assert.equal(resourcePattern[1], "here");
            assert.equal(resourcePattern[2], "*");
            assert.equal(endpoint.getMethodPattern(), "ANSWER");
          }
        }
      }

      var transactionManager = new jstp.JSTPTransactionManager(mockEngine);
      transactionManager.list["here"] = ["add"];
      transactionManager.stop("here");
      assert.equal(mockEngine.dispatchWasCalled, 2);
    }
  }
}).export(module);     