var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

var helper = {
  validEndpoint: new jstp.JSTPEndpoint()
                      .setMethodPattern("*")
                      .setResourcePattern(["*"]),

  callback: function () {},
  context: {},
}

vows.describe('JSTPSubscriptionManager').addBatch({
  'new JSTPSubscriptionManager( JSTPEngine engine )': {
    'shoud assign the engine': function () {
      var engine = {};
      var subscriptionManager = new jstp.JSTPSubscriptionManager(engine);
      assert.equal(subscriptionManager.engine, engine);
    }
  },

  '#bind( JSTPEndpoint endpoint, String transactionID, JSTPCallable callback [, Object context] )': {
    'if not an JSTPEndpoint': {
      'should throw a JSTPNotAnEndpoint': function () {
        var engine = {};
        var subscriptionManager = new jstp.JSTPSubscriptionManager(engine);
        assert.throws(function () {
          subscriptionManager.bind("somethingSomething", "transactionID", function () {});
        }, jstp.JSTPNotAnEndpoint);
      }
    },

    'should call #validate in the JSTPEndpoint': function () {
      var engine = {};
      var endpoint = new jstp.JSTPEndpoint();
      endpoint.validate = function () {
        this.validateWasCalled = true;
      }
      var subscriptionManager = new jstp.JSTPSubscriptionManager(engine);
      subscriptionManager.bind(endpoint, "transactionID", function () {});
      assert.isTrue(endpoint.validateWasCalled);
    },

    'if the transactionID is absent': {
      'should throw a JSTPMissingTransactionID': function () {
        var engine = {};
        var subscriptionManager = new jstp.JSTPSubscriptionManager(engine);
        var endpoint = new jstp.JSTPEndpoint()
          .setMethodPattern("*")
          .setResourcePattern(["what what"]);
        assert.throws(function () {
          subscriptionManager.bind(endpoint, null, function () {});
        }, jstp.JSTPMissingTransactionID);
      }
    },

    'if the callback has no #call': {
      'should throw a JSTPNotCallable': function () {
        var subscriptionManager = new jstp.JSTPSubscriptionManager({});
        assert.throws(function () {
          subscriptionManager.bind(helper.validEndpoint, "transactionID", "notCallable");
        }, jstp.JSTPNotCallable);
      }
    },

    'if this endpoint was already bound for that callback/context pair': {
      'should throw a JSTPEndpointAlreadyBound exception': function () {
        var subscriptionManager = new jstp.JSTPSubscriptionManager({});
        subscriptionManager.bind(helper.validEndpoint, "transactionID", helper.callback, helper.context);
        assert.throws(function () {
          subscriptionManager.bind(helper.validEndpoint, "transactionID", helper.callback, helper.context);
        }, jstp.JSTPEndpointAlreadyBound);
      }
    },

    'if everything is ok': {
      'should add the dictionary with the endpoint/callback/context/transactionID to the list': function () {
        var subscriptionManager = new jstp.JSTPSubscriptionManager({});
        subscriptionManager.bind(helper.validEndpoint, "transactionID", helper.callback, helper.context);
        assert.equal(subscriptionManager.subscriptions[0].endpoint, helper.validEndpoint);
        assert.equal(subscriptionManager.subscriptions[0].transactionID, "transactionID");
        assert.equal(subscriptionManager.subscriptions[0].callback, helper.callback);
        assert.equal(subscriptionManager.subscriptions[0].context, helper.context);
      }
    }
  },

  '#release( JSTPEndpoint endpoint, JSTPCallable callback, Object context )': {
    'if was not found': {
      'should throw a JSTPUnboundEndpoint exception': function () {
        var subscriptionManager = new jstp.JSTPSubscriptionManager();
        assert.throws(function () {
          subscriptionManager.release(helper.validEndpoint, helper.callback, helper.context);          
        }, jstp.JSTPUnboundEndpoint);
      }
    },

    'if it matched something': {
      'should remove the matching dictionary from the list': function () {
        var subscriptionManager = new jstp.JSTPSubscriptionManager({});
        subscriptionManager.bind(helper.validEndpoint, "transactionID", helper.callback, helper.context);
        subscriptionManager.release(helper.validEndpoint, helper.callback, helper.context);          
        assert.equal(subscriptionManager.subscriptions.length, 0);          
      }
    }
  },

  '#trigger( JSTPDispatch )': {
    'there are no endpoints in the list': {
      'should throw a JSTPNotFound': function () {
        var subscriptionManager = new jstp.JSTPSubscriptionManager({});
        var dispatch = new jstp.JSTPDispatch().setMethod("GET").setResource(["pizza"]);
        assert.throws(function () {
          subscriptionManager.trigger(dispatch);
        }, jstp.JSTPNotFound);
      }
    },

    'there are endpoints subscribed': {
      'if it matches no endpoint': {
        'should throw a JSTPNotFound': function () {
          var subscriptionManager = new jstp.JSTPSubscriptionManager({});
          subscriptionManager.
          var dispatch = new jstp.JSTPDispatch().setMethod("GET").setResource(["pizza"]);
          assert.throws(function () {
            subscriptionManager.trigger(dispatch);
          }, jstp.JSTPNotFound);
        }
      },

      'if it matches an endpoint': {
        'if it has a transactionID': {
          'should get a clone of the dispatch with a triggering ID set': 'pending'
        },

        'if there is a context': {
          'should call the callback with the triggering package containing the dispatch, engine and params and the context': 'pending'
        },

        'if there is no context': {
          'should call the callback with the triggering package containing the dispatch, engine and params': 'pending'
        }

        }
      }
    }
  }
}).export(module);     