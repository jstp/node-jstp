var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPTransactionManager').addBatch({
  '#start( JSTPDispatch dispatch )': {
    'should set the Transaction ID in the dispatch': 'pending',
    'should set the timeout for the Transaction ID': 'pending',
    'should set the Transaction ID as a key to an Array': 'pending'
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
    'should remove the transactionID key from the list': 'pending'
  }
}).export(module);     