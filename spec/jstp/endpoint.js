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
      'should clean the resourcePattern': function () {
        var endpoint = new jstp.JSTPEndpoint();
        endpoint.setResourcePattern(null);
        assert.isNull(endpoint.getResourcePattern());
      }
    },

    'is not a valid non empty array': {
      'is an empty array': {
        'should throw an JSTPInvalidResourcePatternType exception': function () {
          var endpoint = new jstp.JSTPEndpoint();
          var invalidResource = [];
          try {
            endpoint.setResourcePattern(invalidResource);
          } catch (e) {
            assert.instanceOf(e, jstp.JSTPInvalidResourcePatternType);
          }
        }
      },

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
        'should return true': 'pending'
      },

      'the Method Header is different from the Pattern': {
        'should return false': 'pending'
      }
    },

    'Method Pattern is a wildcard': {
      'should return true': 'pending'
    }
  },

  '#matchResourcePattern( JSTPDispatch )': {

    topic: new jstp.JSTPDispatch().setMethod("GET"),

    'pattern ["user"]': {

      'resource ["user"]': {
        'should return true': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint().setResourcePattern(["user"]);
          dispatch.setResource(["user"]);
          assert.isTrue(
            endpoint.matchResourcePattern(dispatch)
          );
        }
      },

      'resource ["notUser"]': {
        'should return false': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint().setResourcePattern(["user"]);
          dispatch.setResource(["notUser"]);
          assert.isFalse(
            endpoint.matchResourcePattern(dispatch)
          );
        }
      },
    },

    'pattern ["user", 10]': {
      'resource ["user", 10]': {
        'should return true': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint().setResourcePattern(["user", 10]);
          dispatch.setResource(["user", 10]);
          assert.isTrue(
            endpoint.matchResourcePattern(dispatch)
          );
        }
      },

      'resource ["user", 12]': {
        'should return false': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint().setResourcePattern(["user", 10]);
          dispatch.setResource(["user", 12]);
          assert.isFalse(
            endpoint.matchResourcePattern(dispatch)
          );
        }
      },

      'resource ["user", 10, null]': {
        'should return false': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint().setResourcePattern(["user", 10]);
          dispatch.setResource(["user", 10, null]);
          assert.isFalse(
            endpoint.matchResourcePattern(dispatch)
          );
        }
      }, 

      'resource ["user", 10, "notNull"]': {
        'should return false': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint().setResourcePattern(["user", 10]);
          dispatch.setResource(["user", 10, "notNull"]);
          assert.isFalse(
            endpoint.matchResourcePattern(dispatch)
          );
        }
      },      
    },

    'pattern ["*"]': {
      'resource ["*"]': {
        'should return true': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint().setResourcePattern(["*"]);
          dispatch.setResource(["*"]);
          assert.isTrue(
            endpoint.matchResourcePattern(dispatch)
          );
        },
      },

      'resource ["user"]': {
        'should return true': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint().setResourcePattern(["*"]);
          dispatch.setResource(["user"]);
          assert.isTrue(
            endpoint.matchResourcePattern(dispatch)
          );
        },
      },
    },

    'pattern ["*", "lala"]': {
      'resource ["user", "lala"]': {
        'should return true': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint().setResourcePattern(["*", "lala"]);
          dispatch.setResource(["user", "lala"]);
          assert.isTrue(
            endpoint.matchResourcePattern(dispatch)
          );
        }
      },
      
      'resource ["user", "notLala"]': {
        'should return false': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint().setResourcePattern(["*", "lala"]);
          dispatch.setResource(["user", "notLala"]);
          assert.isFalse(
            endpoint.matchResourcePattern(dispatch)
          );
        }
      },
    },

    'pattern ["*", "*", "*", "*"]': { 
      'BIND dispatch resource pattern ["!%&#$", null, 235]': {
        topic: new jstp.JSTPDispatch().setMethod("BIND"),

        'should return false': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint()
            .setResourcePattern(["*", "*", "*", "*"]);
          dispatch.setEndpoint(
            new jstp.JSTPEndpoint()
              .setMethodPattern("*")
              .setResourcePattern(["!%&#$", null, 235])
          );
          assert.isFalse(
            endpoint.matchResourcePattern(dispatch)
          );
        }
      },

      'BIND dispatch resource pattern ["!%&#$", null, 235, true]': {
        topic: new jstp.JSTPDispatch().setMethod("BIND"),

        'should return false': function (dispatch) {
          var endpoint = new jstp.JSTPEndpoint()
            .setResourcePattern(["*", "*", "*", "*"]);
          dispatch.setEndpoint(
            new jstp.JSTPEndpoint()
              .setMethodPattern("*")
              .setResourcePattern(["!%&#$", null, 235, true])
          );
          assert.isTrue(
            endpoint.matchResourcePattern(dispatch)
          );
        }
      }      
    },

    'pattern ["..."]': {
      topic: function () {
        return {
          endpoint: new jstp.JSTPEndpoint().setResourcePattern(["..."]),
          dispatch: new jstp.JSTPDispatch().setMethod("PUT")
        };
      },

      'resource ["user"]': {
        'should return true': function (pair) {
          pair.dispatch.setResource(["user"]);
          assert.isTrue(
            pair.endpoint.matchResourcePattern(pair.dispatch));
        }
      },

      'resource ["user", "intelligence"]': {
        'should return true': function (pair) {
          pair.dispatch.setResource(["user", "intelligence"]);
          assert.isTrue(
            pair.endpoint.matchResourcePattern(pair.dispatch));
        }
      },

      'resource ["user", "intelligence", "is"]': {
        'should return true': function (pair) {
          pair.dispatch.setResource(["user", "intelligence", "is"]);
          assert.isTrue(
            pair.endpoint.matchResourcePattern(pair.dispatch));
        }
      }
    }

  }
}).export(module); 