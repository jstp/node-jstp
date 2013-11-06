var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPEngine').addBatch({
  '#dispatch': 'pending'
    /*
    '( JSTPDispatch dispatch )': {
      'should call the #validation with the JSTPDispatch': function () {
        var engine    = new jstp.JSTPEngine();
        var dispatch  = new jstp.JSTPDispatch();

        engine.validation = function (argumentArray) {
          this.validationWasCalled = true;
          assert.equal(argumentArray[0], dispatch);
        } 

        engine.dispatch(dispatch);
        assert.isTrue(engine.validationWasCalled);
      }
    },

    '( JSTPDispatch dispatch, JSTPCallable callback )': {
      'should call the #validation with the JSTPDispatch and the callback': function () {
        var engine    = new jstp.JSTPEngine();
        var dispatch  = new jstp.JSTPDispatch();
        var callback  = function () {};

        engine.validation = function (argumentArray) {
          this.validationWasCalled = true;
          assert.equal(argumentArray[0], dispatch);
          assert.equal(argumentArray[1], callback);
        }

        engine.dispatch(dispatch, callback);
        assert.isTrue(engine.validationWasCalled);
      },

      'should call the #transactionIDSetup with the dispatch': function () {
        var engine        = new jstp.JSTPEngine();
        var theDispatch   = new jstp.JSTPDispatch();
        var callback      = function () {};

        engine.validation = function () {};

        engine.transactionIDSetup = function (dispatch) {
          this.transactionIDSetupCalled = true;
          assert.equal(dispatch, theDispatch);
        }

        engine.dispatch(theDispatch, callback);
        assert.isTrue(engine.transactionIDSetupCalled);
      }
    },

    '( JSTPDispatch dispatch, JSTPCallable callback, Object context )': {
      'should call the #validation with the JSTPDispatch, the callback and the context': function () {
        var engine    = new jstp.JSTPEngine();
        var dispatch  = new jstp.JSTPDispatch();
        var callback  = function () {};
        var context   = {};

        engine.validation = function (argumentArray) {
          this.validationWasCalled = true;
          assert.equal(argumentArray[0], dispatch);
          assert.equal(argumentArray[1], callback);
          assert.equal(argumentArray[2], context);
        }

        engine.dispatch(dispatch, callback, context);
        assert.isTrue(engine.validationWasCalled);
      },

      'should call the #transactionIDSetup with the dispatch': function () {
        var engine        = new jstp.JSTPEngine();
        var theDispatch   = new jstp.JSTPDispatch();
        var callback      = function () {};
        var context       = {};

        engine.validation = function () {};

        engine.transactionIDSetup = function (dispatch) {
          this.transactionIDSetupCalled = true;
          assert.equal(dispatch, theDispatch);
        }

        engine.dispatch(theDispatch, callback, context);
        assert.isTrue(engine.transactionIDSetupCalled);
      }      
    }
    /*

    'no arguments': {
      'should throw an exception': function () {
        var engine = new jstp.JSTPEngine();
        assert.throws(function () {
          engine.dispatch();
        }, Error);
      }
    },

    'at least one argument': {
      topic: new jstp.JSTPEngine(),

      'it is not a JSTPDispatch': {
        'should throw an exception': function (engine) {
          assert.throws(function () {
            engine.dispatch("notAnEngine"); 
          }, Error);
        }
      },

      'should call the #validate method of the JSTPDispatch': function (engine) {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.validate = function () {
          this.validateWasCalled = true;
        };
        engine.dispatch(dispatch);
        assert.isTrue(dispatch.validateWasCalled);
      },

      'is there a callback present': {
        'it is not callable': {
          'should throw an JSTPNotCallable': function (engine) {
            var dispatch = new jstp.JSTPDispatch();
            dispatch.setMethod("GET");
            dispatch.setResource(["stuff"]);
            assert.throws(function () {
              engine.dispatch(dispatch, "something");
            }, jstp.JSTPNotCallable);
          }
        }
      },

      'Regular Morphology': {
        '( JSTPDispatch dispatch )': {

        }
      },

    },


    'lala': {
      'should do processing': 'pending'
    },

    '( JSTPDispatch dispatch, JSTPCallable callback )': {
      'should do processing': 'pending'      
    },

    '( JSTPDispatch dispatch, JSTPCallable callback, Object context )': {
      'should do processing': 'pending'      
    }
  },

  '#validation( Array argumentArray )': 'pending',

  '#transactionIDSetup( JSTPDispatch dispatch )': 'pending',

  '#time'
*/
}).export(module); 