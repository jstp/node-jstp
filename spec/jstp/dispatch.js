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
    },

    'no protocol is set': {
      'should return the default': 'pending'
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
      'should restore the protocol to the default': function () {
        var dispatch = new jstp.JSTPDispatch();
        var protocol = ["JSTP", "0.4"];
        dispatch.setProtocol(protocol);
        dispatch.setProtocol(null);
        assert.equal(dispatch.getProtocol()[0], "JSTP");
        assert.equal(dispatch.getProtocol()[1], "0.6");
        assert.equal(dispatch.getProtocol().length, 2);
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
    },

    'no resource is set': {
      'should return the default': 'pending'
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
      'should set the resource to an empty array': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setResource(["asdf"]);
        dispatch.setResource(null);
        assert.equal(dispatch.getResource().length, 0);
      }
    },

    'is not an array': {
      'should throw a JSTPInvalidResourceHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setResource(456);
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
    },

    'no timestamp is set': {
      'should return the current time': 'pending'
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
      'should set the timestamp to the current time': function () {
        var dispatch = new jstp.JSTPDispatch();
        var formerTime = new Date().getTime() - 20000;
        dispatch.setTimestamp(formerTime);
        dispatch.setTimestamp(null);
        assert.isTrue(dispatch.getTimestamp() > formerTime);
        assert.isTrue(dispatch.getTimestamp() < formerTime + 50000);
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
    'should return the Array token': 'pending',
    'no token is set': {
      'should return an empty array': 'pending'
    }
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
    'should return the Array to': 'pending',
    'no To is set': {
      'should return an empty array': 'pending'
    }
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
    'should return the body': 'pending',
    'no Body is set': {
      'should return null': 'pending'
    }
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
    'should return the Array from': 'pending',
    'no From is set': {
      'should return an empty array': 'pending'
    }
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
  },

  '#isOfAnswerMorphology()': {
    'has the ANSWER method': {
      'should return true': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setMethod("ANSWER");
        assert.isTrue(dispatch.isOfAnswerMorphology());
      }
    },

    'has not the ANSWER method': {
      'should return false': 'pending'
    }
  },

  '#isOfRegularMorphology()': {
    'has the GET method': 'pending',
    'has the POST method': 'pending',
    'has the PUT method': 'pending',
    'has the PATCH method': 'pending',
    'has the DELETE method': 'pending',
    'has an unrecognized method': 'pending',
    'has the ANSWER method': 'pending',
    'has the BIND method': 'pending',
    'has the RELEASE method': 'pending',
  },

  '#isOfSubscriptionMorphology()': {    
    'has the BIND method': 'pending',
    'has the RELEASE method': 'pending',
    'has neither the BIND nor the RELEASE method': 'pending'
  }
}).export(module); 