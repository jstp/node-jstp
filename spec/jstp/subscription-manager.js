var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPSubscriptionManager').addBatch({
  '#bind( JSTPEndpoint endpoint, String transactionID, JSTPCallable callback [, Object context] )': {
    'if not an JSTPEndpoint': {
      'should throw an Error': 'pending'
    },

    'if the transactionID is absent': {
      'should throw an Error': 'pending'
    },

    'if the callback has no #call': {
      'should throw an Error': 'pending'
    },

    'if there is an endpoint already bound for that callback/context pair': {
      'should throw a JSTPEndpointAlreadyBound exception': 'pending'
    },

    'if everything is ok': {
      'should add the dictionary with the endpoint/callback/context/transactionID to the list': 'pending'
    }
  },

  '#release( JSTPEndpoint endpoint, JSTPCallable callback, Object context )': {
    'if was not found': {
      'should throw a JSTPUnboundEndpoint exception': 'pending' 
    },

    'if it matched something': {
      'should remove the matching dictionary from the list': 'pending'
    }
  },

  '#trigger( JSTPDispatch )': 'pending'
}).export(module);     