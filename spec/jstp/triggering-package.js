var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPTriggeringPackage').addBatch({
  'new JSTPTriggeringPackage( JSTPEngine engine )': {
    'should initialize the engine': 'pending'
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
  }
}).export(module); 

// dude, that's not TDD. that's OCD-DD