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

  '#bind( JSTPSubscription )': {
    'if not an JSTPSubscription': {
      'should throw a JSTPNotASubscription': function () {
        var engine = {};
        var subscriptionManager = new jstp.JSTPSubscriptionManager(engine);
        assert.throws(function () {
          subscriptionManager.bind("somethingSomething", "transactionID", function () {});
        }, jstp.JSTPNotASubscription);
      }
    },

    'should call #validate in the JSTPEndpoint': function () {
      var engine = {};
      var endpoint = new jstp.JSTPEndpoint();
      var subscription = new jstp.JSTPSubscription()
        .setCallback(function () {})
        .setTransactionID("transactionID");
      endpoint.validate = function () {
        this.validateWasCalled = true;
      }
      subscription.setEndpoint(endpoint);
      var subscriptionManager = new jstp.JSTPSubscriptionManager(engine);

      subscriptionManager.bind(subscription);
      assert.isTrue(endpoint.validateWasCalled);
    },

    'if the transactionID is absent': {
      'should throw a JSTPMissingTransactionID': function () {
        var engine = {};
        var subscriptionManager = new jstp.JSTPSubscriptionManager(engine);
        var endpoint = new jstp.JSTPEndpoint()
          .setMethodPattern("*")
          .setResourcePattern(["what what"]);
        var subscription = new jstp.JSTPSubscription()
            .setCallback(function () {})
            .setEndpoint(endpoint);
        assert.throws(function () {
          subscriptionManager.bind(subscription);
        }, jstp.JSTPMissingTransactionID);
      }
    },

    'if there is no callback': {
      'should throw a JSTPMissingCallback': function () {
        var subscriptionManager = new jstp.JSTPSubscriptionManager({});
        var subscription = new jstp.JSTPSubscription()
            .setEndpoint(helper.validEndpoint)
            .setTransactionID("transactionID");
        assert.throws(function () {
          subscriptionManager.bind(subscription);
        }, jstp.JSTPMissingCallback);
      }
    },

    'if this endpoint was already bound for that callback/context pair': {
      'should throw a JSTPEndpointAlreadyBound exception': function () {
        var subscriptionManager = new jstp.JSTPSubscriptionManager({});
        var subscriptionOld = new jstp.JSTPSubscription()
            .setEndpoint(helper.validEndpoint)
            .setTransactionID("transactionID")
            .setCallback(helper.callback)
            .setContext(helper.context);
        var subscriptionNew = new jstp.JSTPSubscription()
            .setEndpoint(helper.validEndpoint)
            .setTransactionID("transactionID")
            .setCallback(helper.callback)
            .setContext(helper.context);
        subscriptionManager.bind(subscriptionOld);
        assert.throws(function () {
          subscriptionManager.bind(subscriptionNew);
        }, jstp.JSTPEndpointAlreadyBound);
      }
    },

    'if everything is ok': {
      'should add the dictionary with the endpoint/callback/context/transactionID to the list': function () {
        var subscriptionManager = new jstp.JSTPSubscriptionManager({});
        var subscription = new jstp.JSTPSubscription()
            .setEndpoint(helper.validEndpoint)
            .setTransactionID("transactionID")
            .setCallback(helper.callback)
            .setContext(helper.context);        
        subscriptionManager.bind(subscription);
        assert.equal(subscriptionManager.subscriptions[0], subscription);
      }
    }
  },

  '#release( JSTPEndpoint endpoint, JSTPCallable callback, Object context )': {
    'if was not found': {
      'should throw a JSTPUnboundEndpoint exception': function () {
        var subscriptionManager = new jstp.JSTPSubscriptionManager();
        var subscription = new jstp.JSTPSubscription()
            .setEndpoint(helper.validEndpoint)
            .setCallback(helper.callback)
            .setContext(helper.context);
        assert.throws(function () {
          subscriptionManager.release(subscription);          
        }, jstp.JSTPUnboundEndpoint);
      }
    },

    'if it matched something': {
      'should remove the matching dictionary from the list': function () {
        var subscriptionManager = new jstp.JSTPSubscriptionManager({});
        var subscription = new jstp.JSTPSubscription()
            .setEndpoint(helper.validEndpoint)
            .setCallback(helper.callback)
            .setTransactionID("transactionID")
            .setContext(helper.context);
        subscriptionManager.bind(subscription);
        subscriptionManager.release(subscription);          
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
          var subscription = new jstp.JSTPSubscription()
              .setContext(helper.context)
              .setCallback(helper.callback)
              .setTransactionID("transactionID")
              .setEndpoint(helper.validEndpoint);
          subscriptionManager.bind(subscription);

          var dispatch = new jstp.JSTPDispatch()
              .setMethod("GET")
              .setResource(["several", "pizzas"]);

          assert.throws(function () {
            subscriptionManager.trigger(dispatch);
          }, jstp.JSTPNotFound);
        }
      },

      'if it matches an endpoint': {
        'if it has a transactionID': {
          'should get a clone of the dispatch with a triggering ID set': function () {
            var clone = null;
            var transactionManager = {
              newWithTriggeringID: function (dispatch) {
                this.newWithTriggeringIDWasCalled = true;
                var transactionManager = new jstp.JSTPTransactionManager();
                clone = transactionManager.newWithTriggeringID(dispatch);
                return clone;
              }
            }

            var engine = {
              getTransactionManager: function () {
                return transactionManager;
              }
            }

            var subscriptionManager = new jstp.JSTPSubscriptionManager({});

            var emitter = {
              endpoint: new jstp.JSTPEndpoint()
                          .setMethodPattern("GET")
                          .setResourcePattern(["*"]),

              callback: function (triggeringPackage) {
                this.callbackWasCalled = true;
                assert.instanceOf(triggeringPackage, jstp.JSTPTriggeringPackage);
                assert.equal(this, emitter);
                assert.equal(triggeringPackage.dispatch, clone);
                assert.equal(triggeringPackage.engine, engine);
              },

              name: "spec"
            }


            var dispatch = new jstp.JSTPDispatch()
                  .setMethod("GET")
                  .setResource(["matches"]);

            var subscription = new jstp.JSTPSubscription()
                .setEndpoint(emitter.endpoint)
                .setCallback(emitter.callback)
                .setContext(emitter.context)
                .setEmitter(emitter.name)
                .setTransactionID("transactionID");
            subscriptionManager.bind(subscription);

            subscriptionManager.trigger( dispatch );

            assert.isTrue(emitter.callbackWasCalled);
            assert.isTrue(transactionManager.newWithTriggeringIDWasCalled);
          }
        },

        'if there is a context': {
          'should call the callback with the triggering package containing the dispatch, engine and params and the context': 'pending'
        },

        'if there is no context': {
          'should call the callback with the triggering package containing the dispatch, engine and params': 'pending'
        },

        'if the matching endpoint has Named Element Wildcards': {
          'the triggeringPackage should have the params': 'pending'
        }
      }
    }
  }
}).export(module);     