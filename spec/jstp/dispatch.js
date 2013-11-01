var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPDispatch').addBatch({
  '#getProtocol()': {
    'should return the Array protocol': 'pending'
  },

  '#setProtocol( Array<String> protocol )': {
    'is a valid array of strings': {
      'should set the protocol': 'pending'
    },

    'is null': {
      'should clean the protocol': 'pending'
    },

    'is not a valid array of strings': {
      'should throw an exception': 'pending'
    }
  },

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

  '#getTimestamp()': {
    'should return the Long timestamp': 'pending'
  },

  '#setTimestamp( Long timestamp )': {
    'is a valid long': {
      'should set the timestamp': 'pending'
    },

    'is null': {
      'should clean the timestamp': 'pending'
    },

    'is not a valid long': {
      'should throw an exception': 'pending'
    }
  },

  '#getToken()': {
    'should return the Array token': 'pending'
  },

  '#setToken( Array<String> token )': {
    'is a valid array of one or two strings': {
      'should set the token': 'pending'
    },

    'is null': {
      'should clean the token': 'pending'
    },

    'is not a valid array of one or two strings': {
      'should throw an exception': 'pending'
    }
  }, 

  '#getTo()': {
    'should return the Array to': 'pending'
  },

  '#setTo( Array<String> to )': {
    'is a valid array of strings': {
      'should set the to': 'pending'
    },

    'is null': {
      'should clean the to': 'pending'
    },

    'is not a valid array of strings': {
      'should throw an exception': 'pending'
    }
  },

  '#getBody()': {
    'should return the body': 'pending'
  },

  '#setBody( Object body )': {
    'should set the body': 'pending'
  },

  '#getEndpoint()': {
    'should return the JSTPEndpoint endpoint': 'pending'
  },

  '#setEndpoint( JSTPEndpoint endpoint )': {
    'is a valid JSTPEndpoint': {
      'should set the endpoint': 'pending'
    },

    'is null': {
      'should clean the endpoint': 'pending'
    },

    'is not a valid JSTPEndpoint': {
      'should throw an exception': 'pending'
    }
  },

  '#getFrom()': {
    'should return the Array from': 'pending'
  },

  '#setFrom( Array<String> from )': {
    'is a valid array of strings': {
      'should set the from': 'pending'
    },

    'is null': {
      'should clean the from': 'pending'
    },

    'is not a valid array of strings': {
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