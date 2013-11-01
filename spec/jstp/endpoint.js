var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPEndpoint').addBatch({
  '#getMethod()': {
    'should return the String method': 'pending'
  },

  '#setMethod( String method )': {
    'is a valid string': {
      'should set the method': 'pending'
    },

    'is null': {
      'should clean the method': 'pending'
    },

    'is not a valid string nor null': {
      'should throw an exception': 'pending'
    }
  },  

  '#getResource()': {
    'should return the Array resource': 'pending'
  },

  '#setResource( Array resource )': {
    'is a valid non empty array': {
      'should set the resource': 'pending'
    },

    'is null': {
      'should clean the resource': 'pending'
    },

    'is not a valid non empty array': {
      'should throw an exception': 'pending'
    }
  },  

  '#validate()': {
    'is valid': {
      'should return true': 'pending'
    },

    'is not valid': {
      'TODO: list invalidity reasons': 'pending'
    }
  }
}).export(module); 