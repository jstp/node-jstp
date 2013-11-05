var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPTriggeringPackage').addBatch({
  'new JSTPTriggeringPackage( JSTPEngine engine, String currentEmitter )': {
    'a non empty emitter is given': {
      'should have the engine and the emitter': function () {
        var mockEngine = {};
        var triggeringPackage = new jstp.JSTPTriggeringPackage( mockEngine, "emitMe" );
        assert.equal(triggeringPackage.getEngine(), mockEngine);
        assert.equal(triggeringPackage.getCurrentEmitter(), "emitMe");
      }
    },

    'a null emitter is given': {
      'should throw an JSTPMissingEmitterInTriggeringPackage exception': function () {
        assert.throws(function () {
          new jstp.JSTPTriggeringPackage({}, null);
        }, jstp.JSTPMissingEmitterInTriggeringPackage);
      }
    },

    'only one argument is given': {
      'should throw an JSTPMissingEmitterInTriggeringPackage exception': function () {
        assert.throws(function () {
          new jstp.JSTPTriggeringPackage({});
        }, jstp.JSTPMissingEmitterInTriggeringPackage);
      }
    },

    'an empty string is given': {
      'should throw an JSTPMissingEmitterInTriggeringPackage exception': function () {
        assert.throws(function () {
          new jstp.JSTPTriggeringPackage({}, "");
        }, jstp.JSTPMissingEmitterInTriggeringPackage);
      }
    },

    'a non string argument is given': {
      'should throw an JSTPMissingEmitterInTriggeringPackage exception': function () {
        assert.throws(function () {
          new jstp.JSTPTriggeringPackage({}, ["asdf"]);
        }, jstp.JSTPMissingEmitterInTriggeringPackage);
      }
    }
  },

  '#getEngine()': {
    'should return the engine': function () {
      var mockEngine = {};
      var triggeringPackage = new jstp.JSTPTriggeringPackage( mockEngine, "something" );
      assert.equal(triggeringPackage.getEngine(), mockEngine);
    }
  },

  '#setDispatch( JSTPDispatch dispatch )': {
    'is a JSTPDispatch': {
      'not of Answer Morphology': {
        'should set the dispatch': function () {
          var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
          var dispatch = new jstp.JSTPDispatch();
          
          dispatch.setMethod("GET");
          dispatch.setResource(["test"]);
          dispatch.setProtocol(["JSTP", "0.6"]);
          dispatch.setTimestamp(new Date().getTime());
          dispatch.validate = function () {}

          triggeringPackage.setDispatch(dispatch);
          assert.equal(triggeringPackage.getDispatch(), dispatch);
        },
        
        'should not set the answer': function () {
          var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
          var dispatch = new jstp.JSTPDispatch();
          
          dispatch.setMethod("GET");
          dispatch.setResource(["test"]);
          dispatch.setProtocol(["JSTP", "0.6"]);
          dispatch.setTimestamp(new Date().getTime());
          dispatch.validate = function () {}

          triggeringPackage.setDispatch(dispatch);
          assert.isNull(triggeringPackage.getAnswer());
        }
      },

      'of Answer Morphology': {
        'should set the answer': function () {
          var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
          var dispatch = new jstp.JSTPDispatch();
          
          dispatch.setMethod("ANSWER");
          dispatch.setResource([200, "423fweqrqwer", "341gwarewrre"]);
          dispatch.setProtocol(["JSTP", "0.6"]);
          dispatch.setTimestamp(new Date().getTime());
          dispatch.validate = function () {}

          triggeringPackage.setDispatch(dispatch);
          assert.equal(triggeringPackage.getAnswer(), dispatch);          
        },

        'should not set the dispatch': function () {
          var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
          var dispatch = new jstp.JSTPDispatch();
          
          dispatch.setMethod("ANSWER");
          dispatch.setResource([200, "423fweqrqwer", "341gwarewrre"]);
          dispatch.setProtocol(["JSTP", "0.6"]);
          dispatch.setTimestamp(new Date().getTime());
          dispatch.validate = function () {}

          triggeringPackage.setDispatch(dispatch);
          assert.isNull(triggeringPackage.getDispatch());
        }
      },

      'it should call `validate()` on the JSTPDispatch': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setMethod("GET");
        dispatch.validate = function () { this.validateWasCalled = true; }
        triggeringPackage.setDispatch(dispatch);
        assert.isTrue(dispatch.validateWasCalled);
      }
    },

    'is not a JSTPDispatch': {
      'should throw a JSTPInvalidArgumentForSetDispatch error': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something");
        assert.throws(function () {
          triggeringPackage.setDispatch("notADispatch");
        }, jstp.JSTPInvalidArgumentForSetDispatch);
      }
    }
  },

  '#getAnswer()': {
    'there is an answer': {
      'should return the JSTPDispatch answer': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
        var dispatch = new jstp.JSTPDispatch();
        
        dispatch.setMethod("ANSWER");
        dispatch.setResource([200, "423fweqrqwer", "341gwarewrre"]);
        dispatch.setProtocol(["JSTP", "0.6"]);
        dispatch.setTimestamp(new Date().getTime());
        dispatch.validate = function () {}

        triggeringPackage.setDispatch(dispatch);
        assert.equal(triggeringPackage.getAnswer(), dispatch);
      }
    },

    'there is no answer': {
      'should return null': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
        var dispatch = new jstp.JSTPDispatch();
        
        dispatch.setMethod("PUT");
        dispatch.setResource(["341gwarewrre"]);
        dispatch.setProtocol(["JSTP", "0.6"]);
        dispatch.setTimestamp(new Date().getTime());
        dispatch.validate = function () {}

        triggeringPackage.setDispatch(dispatch);
        assert.isNull(triggeringPackage.getAnswer());
      }
    }
  },

  '#getDispatch()': {
    'there is a dispatch': {
      'should return the JSTPDispatch dispatch': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
        var dispatch = new jstp.JSTPDispatch();
        
        dispatch.setMethod("GET");
        dispatch.setResource(["test"]);
        dispatch.setProtocol(["JSTP", "0.6"]);
        dispatch.setTimestamp(new Date().getTime());
        dispatch.validate = function () {}        

        triggeringPackage.setDispatch(dispatch);
        assert.equal(triggeringPackage.getDispatch(), dispatch);
      }
    },

    'there is no dispatch': {
      'should return null': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
        var dispatch = new jstp.JSTPDispatch();
        
        dispatch.setMethod("ANSWER");
        dispatch.setResource([200, "423fweqrqwer", "341gwarewrre"]);
        dispatch.setProtocol(["JSTP", "0.6"]);
        dispatch.setTimestamp(new Date().getTime());
        dispatch.validate = function () {}

        triggeringPackage.setDispatch(dispatch);
        assert.isNull(triggeringPackage.getDispatch());        
      }
    }
  },

  '#getCurrentEmitter()': {
    'should return the emitter label': function () {
      var mockEngine = {};
      var triggeringPackage = new jstp.JSTPTriggeringPackage(mockEngine, "myEmitter");
      assert.equal(triggeringPackage.getCurrentEmitter(), "myEmitter");
    }
  },

  '#answer( Integer statusCode, Object body [, JSTPCallback callback [, Object context ]])': {
    'there is a dispatch with transaction and triggering IDs': {
      'should prepare the JSTPDispatch answer and call the engine with the data': 'pending',
      'should set the From Header accordingly with the current Emitter': 'pending'
    },
    'there is an answer with transaction and triggering IDs': {
      'should prepare the JSTPDispatch answer and call the engine with the data': 'pending',
      'should set the From Header accordingly with the current Emitter': 'pending'
    }
  },

  '#dispatch( JSTPDispatch dispatch [, JSTPCallback callback [, Object context ]])': {
    'should set the From Header accordingly with the current Emitter': 'pending'    
  }
}).export(module); 

// dude, that's not TDD. that's OCD-DD