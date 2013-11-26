var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../../index.js');

vows.describe('JSTPEndpoint').addBatch({
  
  '#getMethodPattern()': {
    'should return the String methodPattern': function () {
      var endpoint = new jstp.JSTPEndpoint();
      endpoint.setMethodPattern("THEFRUIT");
      assert.equal(endpoint.getMethodPattern(), "THEFRUIT");
    }
  },

  '#setMethodPattern( String methodPattern )': {
    'is a valid string': {
      'should set the methodPattern': function () {
        var endpoint = new jstp.JSTPEndpoint();
        endpoint.setMethodPattern("THEFRUIT");
        assert.equal(endpoint.getMethodPattern(), "THEFRUIT");
      }
    },

    'is null': {
      'should clean the methodPattern': function () {
        var endpoint = new jstp.JSTPEndpoint();
        endpoint.setMethodPattern(null);
        assert.isNull(endpoint.getMethodPattern());
      }
    },

    'is not a valid string nor null': {
      'should throw an JSTPInvalidMethodPatternType exception': function () {
        var endpoint = new jstp.JSTPEndpoint();
        try { endpoint.setMethodPattern([]); }
        catch (e) {
          assert.instanceOf(e, jstp.JSTPInvalidMethodPatternType);
        }
      }
    }
  },  

  '#getResourcePattern()': {
    'should return the Array resourcePattern': function () {
      var endpoint = new jstp.JSTPEndpoint();
      var resource = ["element", "otherElement"];
      endpoint.setResourcePattern(resource);
      assert.equal(endpoint.getResourcePattern(), resource);
    }
  },

  '#setResourcePattern( Array resourcePattern )': {
    'is a valid non empty array': {
      'should set the resourcePattern': function () {
        var endpoint = new jstp.JSTPEndpoint();
        var resource = ["element", "otherElement"];
        endpoint.setResourcePattern(resource);
        assert.equal(endpoint.getResourcePattern(), resource);
      }
    },

    'is null': {
      'should return an empty Array': function () {
        var endpoint = new jstp.JSTPEndpoint();
        endpoint.setResourcePattern(null);
        assert.equal(endpoint.getResourcePattern().length, 0);
      }
    },

    'is an empty array': {
      'should set to empty array': function () {
        var endpoint = new jstp.JSTPEndpoint();
        var resource = [];
        endpoint.setResourcePattern(resource);
        assert.equal(endpoint.getResourcePattern(), resource);
      }
    },

    'is not a valid array': {

      'is not an array nor null': {
        'should throw an JSTPInvalidResourcePatternType exception': function () {
          var endpoint = new jstp.JSTPEndpoint();
          var invalidResource = "nonEmpty";
          try {
            endpoint.setResourcePattern(invalidResource);
          } catch (e) {
            assert.instanceOf(e, jstp.JSTPInvalidResourcePatternType);
          }
        }
      }
    }
  },  

  '#getFromPattern()': {
    'should return the Array fromPattern': function () {
      var endpoint = new jstp.JSTPEndpoint();
      var fromPattern = ["home"];
      endpoint.setFromPattern(fromPattern);
      assert.equal(endpoint.getFromPattern(), fromPattern);
    }
  },

  '#setFromPattern( Array fromPattern )': {
    'is a valid non empty array': {
      'should set the fromPattern': function () {
        var endpoint = new jstp.JSTPEndpoint();
        var fromPattern = ["home"];
        endpoint.setFromPattern(fromPattern);
        assert.equal(endpoint.getFromPattern(), fromPattern);        
      }
    },

    'is null': {
      'should clean the fromPattern': function () {
        var endpoint = new jstp.JSTPEndpoint();
        var fromPattern = ["home"];
        endpoint.setFromPattern(fromPattern);
        endpoint.setFromPattern();
        assert.isNull(endpoint.getFromPattern());
      }
    },

    'is not an array': {
      'should throw a JSTPInvalidFromPatternType': function () {
        var endpoint = new jstp.JSTPEndpoint();
        assert.throws(function () {
          endpoint.setFromPattern("myGoodness");
        }, jstp.JSTPInvalidFromPatternType);
      }
    },

    'contains non string elements': {
      'should throw a JSTPInvalidFromPatternType': function () {
        var endpoint = new jstp.JSTPEndpoint();
        assert.throws(function () {
          endpoint.setFromPattern(["asdf", 123]);
        }, jstp.JSTPInvalidFromPatternType);
      }
    }
  },

  '#getToPattern()': {
    'should return the Array toPattern': function () {
      var endpoint = new jstp.JSTPEndpoint();
      var toPattern = ["home"];
      endpoint.setToPattern(toPattern);
      assert.equal(endpoint.getToPattern(), toPattern);
    }
  },

  '#setToPattern( Array toPattern )': {
    'is a valid non empty array': {
      'should set the toPattern': function () {
        var endpoint = new jstp.JSTPEndpoint();
        var toPattern = ["home"];
        endpoint.setToPattern(toPattern);
        assert.equal(endpoint.getToPattern(), toPattern);        
      }
    },

    'is null': {
      'should clean the toPattern': function () {
        var endpoint = new jstp.JSTPEndpoint();
        var toPattern = ["home"];
        endpoint.setToPattern(toPattern);
        endpoint.setToPattern();
        assert.isNull(endpoint.getToPattern());        
      }
    },

    'is not an array': {
      'should throw a JSTPInvalidToPatternType': function () {
        var endpoint = new jstp.JSTPEndpoint();
        assert.throws(function () {
          endpoint.setToPattern("myGoodness");
        }, jstp.JSTPInvalidToPatternType);        
      }
    },

    'contains non string elements': {
      'should throw a JSTPInvalidToPatternType': function () {
        var endpoint = new jstp.JSTPEndpoint();
        assert.throws(function () {
          endpoint.setToPattern(["asdf", 123]);
        }, jstp.JSTPInvalidToPatternType);        
      }
    }
  },

  '#validate()': {
    'is valid': {
      'should return true': function () {
        var endpoint = new jstp.JSTPEndpoint();
        var resourcePattern = ["asdfa", null, 6];
        var methodPattern = "水";
        endpoint.setResourcePattern(resourcePattern);
        endpoint.setMethodPattern(methodPattern);
        assert.isTrue(endpoint.validate());
      }
    },

    'the method pattern is missing': {
      topic: function () {
        var endpoint = new jstp.JSTPEndpoint();
        var resourcePattern = [34, "asdf"];
        var nullMethod = null;
        endpoint.setResourcePattern(resourcePattern);
        endpoint.setMethodPattern(nullMethod);
        return endpoint;        
      },

      'it should throw an JSTPMissingMethodPatternInEndpoint': function (endpoint) {
        assert.throws(function () { endpoint.validate();
        }, jstp.JSTPMissingMethodPatternInEndpoint);
      }
    },

    'the resource pattern is missing': {
      topic: function () {
        var endpoint = new jstp.JSTPEndpoint();
        endpoint.setResourcePattern(null);
        endpoint.setMethodPattern("234");
        return endpoint;
      },

      'it should throw an JSTPMissingResourcePatternInEndpoint': function (endpoint) {
        assert.throws(function () { endpoint.validate();
        }, jstp.JSTPMissingResourcePatternInEndpoint);
      } 
    }
  },

  '#equivalent()': {
    'if both have a methodPattern with equal value': {
      'should return true': function () {
        var endpointA = new jstp.JSTPEndpoint().setMethodPattern("HEY");
        var endpointB = new jstp.JSTPEndpoint().setMethodPattern("HEY");
        assert.isTrue(endpointA.equivalent(endpointB));
      }
    },

    'if the methodPattern is different': {
      'should return false': function () {
        var endpointA = new jstp.JSTPEndpoint().setMethodPattern("HEYA");
        var endpointB = new jstp.JSTPEndpoint().setMethodPattern("HEY");
        assert.isFalse(endpointB.equivalent(endpointA));
      }
    },

    'if both have a resourcePattern with equal contents': {
      'and a methodPattern with equal contents': {
        'should return true': function () {
          var endpointA = new jstp.JSTPEndpoint().setMethodPattern("HEY")
            .setResourcePattern([123, null, "hey"]);
          var endpointB = new jstp.JSTPEndpoint().setMethodPattern("HEY")
            .setResourcePattern([123, null, "hey"]);
          assert.isTrue(endpointB.equivalent(endpointA));
        }
      },

      'and a methodPattern with different contents': {
        'should return false': function () {
          var endpointA = new jstp.JSTPEndpoint().setMethodPattern("HEY")
            .setResourcePattern([123, null, "hey"]);
          var endpointB = new jstp.JSTPEndpoint().setMethodPattern("HEYU")
            .setResourcePattern([123, null, "hey"]);
          assert.isFalse(endpointB.equivalent(endpointA));
        }
      }
    },

    'if the resourcePatterns are different': {
      'is should return false': function () {
        var endpointA = new jstp.JSTPEndpoint().setMethodPattern("HEY")
          .setResourcePattern([123, null, "hey"]);
        var endpointB = new jstp.JSTPEndpoint().setMethodPattern("HEY")
          .setResourcePattern([123, null, "hola"]);
        assert.isFalse(endpointB.equivalent(endpointA));        
      }
    },

    'if the toPatterns are different': {
      'should return false': function () {
        var endpointA = new jstp.JSTPEndpoint().setMethodPattern("HEY")
          .setResourcePattern([123, null, "hey"])
          .setToPattern(["here", "there"]);
        var endpointB = new jstp.JSTPEndpoint().setMethodPattern("HEY")
          .setResourcePattern([123, null, "hey"])
          .setToPattern(["here", "far"]);
        assert.isFalse(endpointB.equivalent(endpointA));                
      }
    },

    'if the fromPatterns are different': {
      'should return false': function () {
        var endpointA = new jstp.JSTPEndpoint().setMethodPattern("HEY")
          .setResourcePattern([123, null, "hey"])
          .setToPattern(["here", "there"])
          .setFromPattern(["sas"]);
        var endpointB = new jstp.JSTPEndpoint().setMethodPattern("HEY")
          .setResourcePattern([123, null, "hey"])
          .setToPattern(["here", "there"])
          .setFromPattern(["312", "123"]);
        assert.isFalse(endpointB.equivalent(endpointA));                
      }
    }
  },

  '#matchMethodPattern( JSTPDispatch )': {
    'Method Pattern is definite': {
      'the Method Header is equal to the pattern': {
        'should return true': function () {
          var endpoint = new jstp.JSTPEndpoint()
                .setMethodPattern("GET");
          var dispatch = new jstp.JSTPDispatch()
                .setMethod("GET")
                .setResource(["asdfa", "as"]);
          assert.isTrue(endpoint.matchMethodPattern(dispatch));
        }
      },

      'the Method Header is different from the Pattern': {
        'should return false': function () {
          var endpoint = new jstp.JSTPEndpoint()
                .setMethodPattern("GET");
          var dispatch = new jstp.JSTPDispatch()
                .setMethod("PUT")
                .setResource(["asfdas"]);
          assert.isFalse(endpoint.matchMethodPattern(dispatch));
        }
      }
    },

    'Method Pattern is a wildcard': {
      'should return true': function () {
        var endpoint = new jstp.JSTPEndpoint()
              .setMethodPattern("*");
        var dispatch = new jstp.JSTPDispatch()
              .setMethod("GET")
              .setResource(["asdfa", "as"]);
        assert.isTrue(endpoint.matchMethodPattern(dispatch));
      }
    }
  },

  '#matchResourcePattern( JSTPDispatch )': {

    'should send the resource pattern of the endpoint and the resource pattern of the matchable endpoint to the JSTPPatternComparer compare': function () {
      var endpointResourcePattern = ["*"];
      var dispatchResourcePattern = ["lala"];
      var endpoint = new jstp.JSTPEndpoint()
            .setResourcePattern(endpointResourcePattern);
      var dispatch = new jstp.JSTPDispatch()
            .setMethod("GET")
            .setResource(dispatchResourcePattern);

      jstp.JSTPPatternComparer.compare = function (pattern, value) {
        this.compareWasCalled = true;
        assert.equal(pattern, endpointResourcePattern);
        assert.equal(value, dispatchResourcePattern);
      }

      endpoint.matchResourcePattern( dispatch );

      assert.isTrue(jstp.JSTPPatternComparer.compareWasCalled);
    },

    'should propagate JSTPPatternComparer compare return value': function () {
      var endpointResourcePattern = ["*"];
      var dispatchResourcePattern = ["lala"];
      var endpoint = new jstp.JSTPEndpoint()
            .setResourcePattern(endpointResourcePattern);
      var dispatch = new jstp.JSTPDispatch()
            .setMethod("GET")
            .setResource(dispatchResourcePattern);

      var returnable = {};

      jstp.JSTPPatternComparer.compare = function (pattern, value) {
        return returnable;
      }

      assert.equal(endpoint.matchResourcePattern( dispatch ), returnable);
    },

    'should propagate exceptions thrown by JSTPPatternComparer compare': function () {
      var endpointResourcePattern = ["*"];
      var dispatchResourcePattern = ["lala"];
      var endpoint = new jstp.JSTPEndpoint()
            .setResourcePattern(endpointResourcePattern);
      var dispatch = new jstp.JSTPDispatch()
            .setMethod("GET")
            .setResource(dispatchResourcePattern);

      jstp.JSTPPatternComparer.compare = function (pattern, value) {
        throw new Error;
      }      

      assert.throws( function () {
        endpoint.matchResourcePattern( dispatch );
      }, Error);
    }

  },

  '#matchFromPattern( JSTPDispatch )': {
    'should send the from pattern of the endpoint and the from pattern of the matchable endpoint to the JSTPPatternComparer compare and specify not to use Named Element Pattern': function () {
      var endpointFromPattern = ["*"];
      var dispatchFromPattern = ["lala"];
      var endpoint = new jstp.JSTPEndpoint()
            .setFromPattern(endpointFromPattern);
      var dispatch = new jstp.JSTPDispatch()
            .setMethod("GET")
            .setResource(["blabla"])
            .setFrom(dispatchFromPattern);

      jstp.JSTPPatternComparer.compare = function (pattern, value, matches, notUseNamedElementWildcard) {
        this.compareWasCalled = true;
        assert.equal(pattern, endpointFromPattern);
        assert.equal(value, dispatchFromPattern);
        assert.isNull(matches);
        assert.isTrue(notUseNamedElementWildcard);
      }

      endpoint.matchFromPattern( dispatch );

      assert.isTrue(jstp.JSTPPatternComparer.compareWasCalled);      
    },

    'should propagate JSTPPatternComparer compare return value': function () {
      var endpointFromPattern = ["*"];
      var dispatchFromPattern = ["lala"];
      var endpoint = new jstp.JSTPEndpoint()
            .setFromPattern(endpointFromPattern);
      var dispatch = new jstp.JSTPDispatch()
            .setMethod("GET")
            .setResource(["blabla"])
            .setFrom(dispatchFromPattern);

      var returnable = {};

      jstp.JSTPPatternComparer.compare = function (pattern, value) {
        return returnable;
      }

      assert.equal(endpoint.matchFromPattern( dispatch ), returnable);
    },

    'should propagate exceptions thrown by JSTPPatternComparer compare': function () {
      var endpointFromPattern = ["*"];
      var dispatchFromPattern = ["lala"];
      var endpoint = new jstp.JSTPEndpoint()
            .setFromPattern(endpointFromPattern);
      var dispatch = new jstp.JSTPDispatch()
            .setMethod("GET")
            .setResource(["blabla"])
            .setFrom(dispatchFromPattern);

      jstp.JSTPPatternComparer.compare = function (pattern, value) {
        throw new Error;
      }      

      assert.throws( function () {
        endpoint.matchFromPattern( dispatch );
      }, Error);
    }

  },

  '#matchToPattern( JSTPDispatch )': {
    'should send the to pattern of the endpoint and the to pattern of the matchable endpoint to the JSTPPatternComparer compare and specify not to use Named Element Pattern': function () {
      var endpointToPattern = ["*"];
      var dispatchToPattern = ["lala"];
      var endpoint = new jstp.JSTPEndpoint()
            .setToPattern(endpointToPattern);
      var dispatch = new jstp.JSTPDispatch()
            .setMethod("GET")
            .setResource(["blabla"])
            .setTo(dispatchToPattern);

      jstp.JSTPPatternComparer.compare = function (pattern, value, matches, notUseNamedElementWildcard) {
        this.compareWasCalled = true;
        assert.equal(pattern, endpointToPattern);
        assert.equal(value, dispatchToPattern);
        assert.isNull(matches);
        assert.isTrue(notUseNamedElementWildcard);
      }

      endpoint.matchToPattern( dispatch );

      assert.isTrue(jstp.JSTPPatternComparer.compareWasCalled);         
    },

    'should propagate JSTPPatternComparer compare return value': function () {
      var endpointToPattern = ["*"];
      var dispatchToPattern = ["lala"];
      var endpoint = new jstp.JSTPEndpoint()
            .setToPattern(endpointToPattern);
      var dispatch = new jstp.JSTPDispatch()
            .setMethod("GET")
            .setResource(["blabla"])
            .setTo(dispatchToPattern);

      var returnable = {};

      jstp.JSTPPatternComparer.compare = function (pattern, value) {
        return returnable;
      }

      assert.equal(endpoint.matchToPattern( dispatch ), returnable);
    },

    'should propagate exceptions thrown by JSTPPatternComparer compare': function () {
      var endpointToPattern = ["*"];
      var dispatchToPattern = ["lala"];
      var endpoint = new jstp.JSTPEndpoint()
            .setToPattern(endpointToPattern);
      var dispatch = new jstp.JSTPDispatch()
            .setMethod("GET")
            .setResource(["blabla"])
            .setTo(dispatchToPattern);

      jstp.JSTPPatternComparer.compare = function (pattern, value) {
        throw new Error;
      }      

      assert.throws( function () {
        endpoint.matchToPattern( dispatch );
      }, Error);
    }
  },

  '#match( JSTPDispatch )': {
    'should return the boolean AND of all the matches methods with the dispatch': function () {
      var endpoint = new jstp.JSTPEndpoint();
      var theDispatch = new jstp.JSTPDispatch();

      endpoint.matchResourcePattern = function (dispatch) {
        this.matchResourcePatternWasCalled = true;
        assert.equal(dispatch, theDispatch);
        return true;
      }
      endpoint.matchToPattern = function (dispatch) {
        this.matchToPatternWasCalled = true;
        assert.equal(dispatch, theDispatch);
        return true;
      }
      endpoint.matchMethodPattern = function (dispatch) {
        this.matchMethodPatternWasCalled = true;
        assert.equal(dispatch, theDispatch);
        return true;
      }
      endpoint.matchFromPattern = function (dispatch) {
        this.matchFromPatternWasCalled = true;
        assert.equal(dispatch, theDispatch);
        return true;
      }

      assert.isTrue(endpoint.match(theDispatch));

      assert.isTrue(endpoint.matchFromPatternWasCalled);
      assert.isTrue(endpoint.matchToPatternWasCalled);
      assert.isTrue(endpoint.matchResourcePatternWasCalled);
      assert.isTrue(endpoint.matchMethodPatternWasCalled);
    }
  }
}).export(module); 