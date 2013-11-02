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
  }
}).export(module); 