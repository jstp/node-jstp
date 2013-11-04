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
    'is a valid non answer JSTPDispatch': {
      'should set the dispatch': function () {
        var triggeringPackage = new jstp.JSTPTriggeringPackage( {}, "something" );
        var dispatch = new jstp.JSTPDispatch();
        
        dispatch.setMethod("GET");
        dispatch.setResource(["test"]);
        dispatch.setProtocol(["JSTP", "0.6"]);
        dispatch.setTimestamp(new Date().getTime());

        triggeringPackage.setDispatch(dispatch);
        assert.equal(triggeringPackage.getDispatch(), dispatch);
      },
      
      'should not set the answer': 'pending'
    },

    'is a valid answer JSTPDispatch': {
      'should set the answer': 'pending',
      'should not set the dispatch': 'pending'
    }
  },

  '#getAnswer()': {
    'there is an answer': {
      'should return the JSTPDispatch answer': 'pending'
    },

    'there is no answer': {
      'should return null': 'pending'
    }
  },

  '#getDispatch()': {
    'there is a dispatch': {
      'should return the JSTPDispatch dispatch': 'pending'
    },

    'there is no dispatch': {
      'should return null': 'pending'
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