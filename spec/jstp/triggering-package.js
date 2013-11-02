var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPTriggeringPackage').addBatch({
  'new JSTPTriggeringPackage( JSTPEngine engine, String currentEmitter )': {
    'a non empty emitter is given': {
      'should have the engine and the emitter': 'pending'/*function () {
        var mockEngine = {};
        var triggeringPackage = new jstp.JSTPTriggeringPackage( mockEngine, "emitMe" );
        assert.equal(triggeringPackage.getEngine(), mockEngine);
        assert.equal(triggeringPackage.getCurrentEmitter(), "emitMe");
      }*/
    },

    'an empty or null emitter is given': {
      'should throw an JSTPMissingEmitterInTriggeringPackage exception': 'pending'
    }
  },

  '#getEngine()': {
    'should return the engine': 'pending'
  },

  '#setAsDispatchWith( JSTPDispatch dispatch )': {
    'is a valid non answer JSTPDispatch': {
      'should set the dispatch': 'pending',
      'there was an answer set': {
        'should remove the answer': 'pending'
      }
    }
  },

  '#setAsAnswerWith( JSTPDispatch answer )': {
    'is a valid answer JSTPDispatch': {
      'should set the answer': 'pending',
      'there was a dispatch set': {
        'should remove the dispatch': 'pending'
      }
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
    'should return the emitter label': 'pending'
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