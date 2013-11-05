var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPDispatch').addBatch({
  '#getProtocol()': {
    'should return the Array protocol': function () {
      var dispatch = new jstp.JSTPDispatch();
      var protocol = ["JSTP", "0.6"]
      dispatch.setProtocol(protocol);
      assert.equal(dispatch.getProtocol(), protocol);
    }
  },

  '#setProtocol( Array<String> protocol )': {
    'is a valid array of strings': {
      'should set the protocol': function () {
        var dispatch = new jstp.JSTPDispatch();
        var protocol = ["JSTP", "0.6"];
        dispatch.setProtocol(protocol);
        assert.equal(dispatch.getProtocol(), protocol);
      }
    },

    'is null': {
      'should clean the protocol': function () {
        var dispatch = new jstp.JSTPDispatch();
        var protocol = ["JSTP", "0.6"];
        dispatch.setProtocol(protocol);
        dispatch.setProtocol(null);
        assert.isNull(dispatch.getProtocol());
      }
    },

    'is an empty array': {
      'should throw a JSTPInvalidProtocolHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setProtocol([]);
        }, jstp.JSTPInvalidProtocolHeaderDefinition);
      }
    },

    'is not an array': {
      'should throw a JSTPInvalidProtocolHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setProtocol("this stuff");
        }, jstp.JSTPInvalidProtocolHeaderDefinition);
      }
    },

    'contains non-string elements': {
      'should throw a JSTPInvalidProtocolHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setProtocol(["asdfda", 21]);
        }, jstp.JSTPInvalidProtocolHeaderDefinition);
      }
    },
  },

  '#getMethod()': {
    'should return the String method': function () {
      var dispatch = new jstp.JSTPDispatch();
      dispatch.setMethod("PUT");
      assert.equal(dispatch.getMethod(), "PUT");
    }
  },

  '#setMethod( String method )': {
    'is a valid string': {
      'should set the method': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setMethod("POST");
        assert.equal(dispatch.getMethod(), "POST");
      }
    },

    'is null': {
      'should clean the method': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setMethod(null);
        assert.isNull(dispatch.getMethod());
      }
    },

    'is not a valid string nor null': {
      'should throw a JSTPInvalidMethodHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setMethod(345);
        }, jstp.JSTPInvalidMethodHeaderDefinition);
      }
    },

    'is an empty string': {
      'should throw a JSTPInvalidMethodHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setMethod("");
        }, jstp.JSTPInvalidMethodHeaderDefinition);
      }
    }
  },  

  '#getResource()': {
    'should return the Array resource': function () {
      var dispatch = new jstp.JSTPDispatch();
      var resource = ["sfdas"];
      dispatch.setResource(resource);
      assert.equal(dispatch.getResource(), resource);
    }
  },

  '#setResource( Array resource )': {
    'is a valid non empty array': {
      'should set the resource': function () {
        var dispatch = new jstp.JSTPDispatch();
        var resource = ["asdf"];
        dispatch.setResource(resource);
        assert.equal(dispatch.getResource(), resource);
      }
    },

    'is null': {
      'should clean the resource': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setResource(["asdf"]);
        dispatch.setResource(null);
        assert.isNull(dispatch.getResource());
      }
    },

    'is not an array': {
      'should throw a JSTPInvalidResourceHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setResource(456);
        }, jstp.JSTPInvalidResourceHeaderDefinition);
      }
    },

    'is an empty array': {
      'should throw a JSTPInvalidResourceHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setResource([]);
        }, jstp.JSTPInvalidResourceHeaderDefinition);
      }
    }
  },  

  '#getTimestamp()': {
    'should return the Long timestamp': function () {
      var dispatch  = new jstp.JSTPDispatch();
      var now       = new Date().getTime();
      dispatch.setTimestamp(now);
      assert.equal(dispatch.getTimestamp(), now);
    }
  },

  '#setTimestamp( Long timestamp )': {
    'is a valid long': {
      'should set the timestamp': function () {
        var dispatch  = new jstp.JSTPDispatch();
        var now       = new Date().getTime();
        dispatch.setTimestamp(now);
        assert.equal(dispatch.getTimestamp(), now);
      }
    },

    'is null': {
      'should clean the timestamp': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setTimestamp(new Date().getTime());
        dispatch.setTimestamp(null);
        assert.isNull(dispatch.getTimestamp());
      }
    },

    'is not a valid number': {
      'should throw an exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setTimestamp("NotANumber"); 
        }, jstp.JSTPInvalidTimestampHeaderDefinition);
      }
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