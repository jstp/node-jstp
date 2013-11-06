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
      'should return the default': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.equal(dispatch.getProtocol()[0], "JSTP");
        assert.equal(dispatch.getProtocol()[1], "0.6");
        assert.equal(dispatch.getProtocol().length, 2);
      }
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
      'should return the default': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.isArray(dispatch.getResource());
        assert.equal(dispatch.getResource().length, 0);
      }
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
      'should return the current time': function () {
        var notQuiteNow = new Date().getTime() - 1000;
        var dispatch = new jstp.JSTPDispatch();
        assert.isTrue(dispatch.getTimestamp() > notQuiteNow);
        assert.isTrue(dispatch.getTimestamp() < notQuiteNow + 3000);
      }
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
    'should return the Array token': function () {
      var dispatch = new jstp.JSTPDispatch();
      var token = ["transID", "trigID"];
      dispatch.setToken(token);
      assert.equal(dispatch.getToken(), token);
    },
    'no token is set': {
      'should return an empty array': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.isArray(dispatch.getToken());
        assert.equal(dispatch.getToken().length, 0);
      }
    }
  },

  '#setToken( Array<String> token )': {
    'is a valid array of one or two strings': {
      'should set the token': function () {
        var dispatch = new jstp.JSTPDispatch();
        var token = ["transID", "trigID"];
        dispatch.setToken(token);
        assert.equal(dispatch.getToken(), token);
      }
    },

    'is null': {
      'should set the token to an empty array': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setToken(["something"]);
        dispatch.setToken();
        assert.isArray(dispatch.getToken());
        assert.equal(dispatch.getToken().length, 0);
      }
    },

    'is not an array': {
      'should throw a JSTPInvalidTokenHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setToken("other stuff");
        }, jstp.JSTPInvalidTokenHeaderDefinition);
      }
    },

    'some element is not a string': {
      'should throw a JSTPInvalidTokenHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setToken([null, 123]);
        }, jstp.JSTPInvalidTokenHeaderDefinition);
      },
    },

    'there are more than two strings': {
      'should throw a JSTPInvalidTokenHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setToken(["one", "two", "invalid!"])
        }, jstp.JSTPInvalidTokenHeaderDefinition);
      }
    }
  }, 

  '#getTo()': {
    'should return the Array to': function () {
      var dispatch  = new jstp.JSTPDispatch();
      var to        = ["valid"];
      dispatch.setTo(to);
      assert.equal(dispatch.getTo(), to);
    },
    'no To is set': {
      'should return an empty array': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.isArray(dispatch.getTo());
        assert.equal(dispatch.getTo().length, 0);
      }
    }
  },

  '#setTo( Array<String> to )': {
    'is a valid array of strings': {
      'should set the to': function () {
        var dispatch  = new jstp.JSTPDispatch();
        var to        = ["valid"];
        dispatch.setTo(to);
        assert.equal(dispatch.getTo(), to);
      }
    },

    'is null': {
      'should return an empty array': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setTo(["lala"]);
        dispatch.setTo();
        assert.isArray(dispatch.getTo());
        assert.equal(dispatch.getTo().length, 0);
      }
    },

    'is not an array': {
      'should throw a JSTPInvalidToHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setTo("anything else");
        }, jstp.JSTPInvalidToHeaderDefinition);
      }
    },

    'is not an array of only strings': {
      'should throw a JSTPInvalidToHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setTo([null, 123]);
        }, jstp.JSTPInvalidToHeaderDefinition);
      }
    }
  },

  '#getBody()': {
    'should return the body': function () {
      var dispatch = new jstp.JSTPDispatch();
      var body = {
        its: "something!"
      }
      dispatch.setBody(body);
      assert.equal(dispatch.getBody(), body);
    },
    'no Body is set': {
      'should return null': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.isNull(dispatch.getBody());
      }
    }
  },

  '#setBody( Object body )': {
    'should set the body': function () {
      var dispatch = new jstp.JSTPDispatch();
      var body = {
        its: "something!"
      }
      dispatch.setBody(body);
      assert.equal(dispatch.getBody(), body);
    },

    'is a function': {
      'should throw a JSTPInvalidBodyHeaderDefinition': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setBody(function () {});
        }, jstp.JSTPInvalidBodyHeaderDefinition);
      }
    }
  },

  '#getEndpoint()': {
    'should return the JSTPEndpoint endpoint': function () {
      var dispatch = new jstp.JSTPDispatch();
      var endpoint = new jstp.JSTPEndpoint();
      dispatch.setEndpoint(endpoint);
      assert.equal(dispatch.getEndpoint(), endpoint);      
    },

    'there is no endpoint set': {
      'should return null': function () {
        var dispatch = new jstp.JSTPDispatch();
      }
    }
  },

  '#setEndpoint( JSTPEndpoint endpoint )': {
    'is a valid JSTPEndpoint': {
      'should set the endpoint': function () {
        var dispatch = new jstp.JSTPDispatch();
        var endpoint = new jstp.JSTPEndpoint();
        dispatch.setEndpoint(endpoint);
        assert.equal(dispatch.getEndpoint(), endpoint);
      }
    },

    'is null': {
      'should clean the endpoint': function () {
        var dispatch = new jstp.JSTPDispatch();
        var endpoint = new jstp.JSTPEndpoint();
        dispatch.setEndpoint(endpoint);
        dispatch.setEndpoint();
        assert.isNull(dispatch.getEndpoint());
      }
    },

    'is not a valid JSTPEndpoint': {
      'should throw an exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setEndpoint("notAnEndpoint");
        }, jstp.JSTPInvalidEndpointHeaderDefinition);
      }
    }
  },

  '#getFrom()': {
    'should return the Array from': function () {
      var dispatch  = new jstp.JSTPDispatch;
      var whereFrom = ["over there"]
      dispatch.setFrom(whereFrom);
      assert.equal(dispatch.getFrom(), whereFrom);
    },
    'no From is set': {
      'should return an empty array': function () {
        var dispatch = new jstp.JSTPDispatch;
        assert.isArray(dispatch.getFrom());
        assert.equal(dispatch.getFrom().length, 0);
      }
    }
  },

  '#setFrom( Array<String> from )': {
    'is a valid array of strings': {
      'should set the from': function () {
        var dispatch  = new jstp.JSTPDispatch;
        var whereFrom = ["over there"]
        dispatch.setFrom(whereFrom);
        assert.equal(dispatch.getFrom(), whereFrom);
      }
    },

    'is null': {
      'should set the from to an empty array': function () {
        var dispatch = new jstp.JSTPDispatch();
        var whereFrom = ["right here"];
        dispatch.setFrom(whereFrom);
        dispatch.setFrom(null);
        assert.isArray(dispatch.getFrom());
        assert.equal(dispatch.getFrom().length, 0);
      }
    },

    'is not an array': {
      'should throw a JSTPInvalidFromHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setFrom("notAnArray");
        }, jstp.JSTPInvalidFromHeaderDefinition);
      }
    },

    'has elements which are not strings': {
      'should throw a JSTPInvalidFromHeaderDefinition exception': function () {
        var dispatch = new jstp.JSTPDispatch();
        assert.throws(function () {
          dispatch.setFrom([3454235, "231"]);
        }, jstp.JSTPInvalidFromHeaderDefinition);
      }
    }
  },

  '#validate()': {
    topic: new jstp.JSTPDispatch(),

    'is not recognizable protocol': {
      'should throw an JSTPUnrecognizedProtocol exception': function (dispatch) {
        dispatch.setProtocol(["HTTP", "0.4"]);
        assert.throws(function () {
          dispatch.validate();
        }, jstp.JSTPUnrecognizedProtocol);
      }
    },

    'is a recognizable protocol': {
      'is not a supported version': {
        'should throw a JSTPUnsupportedProtocolVersion exception': function (dispatch) {
          dispatch.setProtocol(["JSTP", "0.4"]);
          assert.throws(function () {
            dispatch.validate();
          }, jstp.JSTPUnsupportedProtocolVersion);
        }
      },

      'is 0.6 version': {
        'the Method is null': {
          'should throw a JSTPMissingMethodHeader exception': function () {
            var dispatch = new jstp.JSTPDispatch();
            assert.throws(function () {
              dispatch.validate();
            }, jstp.JSTPMissingMethodHeader);
          }
        },

        'Answer Morphology': {          
          'the Endpoint is not null': {
            topic: new jstp.JSTPDispatch().setMethod("ANSWER"),
            
            'should throw a JSTPInvalidEndpointInAnswer': function (dispatch) {
              var endpoint = new jstp.JSTPEndpoint();
              dispatch.setMethod("ANSWER");
              dispatch.setEndpoint(endpoint);
              assert.throws(function () {
                dispatch.validate();
              }, jstp.JSTPInvalidEndpointInAnswer);
            }, 
          },

          'the Endpoint is null': {
            topic: new jstp.JSTPDispatch().setMethod("ANSWER"),

            'the Triggering ID is of invalid type': {
              'should throw a JSTPInvalidResourceHeaderForAnswer': function (dispatch) {
                dispatch.setResource([200, "transID", true]);
                assert.throws(function () {
                  dispatch.validate();
                }, jstp.JSTPInvalidResourceHeaderForAnswer);
              }
            },

            'the Transaction ID is of invalid type': {
              'should throw a JSTPInvalidResourceHeaderForAnswer': function (dispatch) {
                dispatch.setResource([200, true, "something"]);
                assert.throws(function () {
                  dispatch.validate();
                }, jstp.JSTPInvalidResourceHeaderForAnswer);
              }
            },

            'the Status Code is of invalid type': {
              'should throw a JSTPInvalidStatusCode': function (dispatch) {
                dispatch.setResource([true, 234, "something"]);
                assert.throws(function () {
                  dispatch.validate();
                }, jstp.JSTPInvalidStatusCode);
              }
            },

            'the Resource is empty': {
              'should throw a JSTPInvalidResourceHeaderForAnswer': function (dispatch) {
                dispatch.setResource([]);
                assert.throws(function () {
                  dispatch.validate();
                }, jstp.JSTPInvalidResourceHeaderForAnswer);
              }
            },

            'the Resource is correct': {
              'the To Header is not empty': {
                'should throw a JSTPInvalidToInAnswer': function (dispatch) {
                  dispatch.setResource([200, "transID", "trigID"]);
                  dispatch.setTo(["somestuff"]);
                  assert.throws(function () {
                    dispatch.validate();
                  }, jstp.JSTPInvalidToInAnswer);
                }
              },

              'the To Header is empty': {
                'should return true': function (dispatch) {
                  dispatch.setTo();
                  assert.isTrue(dispatch.validate());
                }
              }
            }
          }
        },

        'Subscription Morphology': {
          topic: new jstp.JSTPDispatch().setMethod("BIND"),

          'the Endpoint is null': {
            'should throw a JSTPMissingEndpointInSubscription': function (dispatch) {
              assert.throws(function () {
                dispatch.validate();
              }, jstp.JSTPMissingEndpointInSubscription);
            }
          },

          'the Endpoint is not null': {
            topic: new jstp.JSTPDispatch().setMethod("RELEASE"),

            'should call the #validate of the endpoint': function (dispatch) {
              var endpoint = new jstp.JSTPEndpoint();
              endpoint.validate = function () {
                this.validateWasCalled = true;
              }
              dispatch.setEndpoint(endpoint);
              dispatch.validate();
              assert.isTrue(endpoint.validateWasCalled);
            },

            'the Resource is not empty': {
              'should throw a JSTPInvalidResourceInSubscription': function (dispatch) {
                dispatch.setResource(["something"]);
                assert.throws(function () {
                  dispatch.validate();
                }, jstp.JSTPInvalidResourceInSubscription);
              }
            },

            'the Resource is empty': {
              'should return true': function (dispatch) {
                dispatch.setResource();
                assert.isTrue(dispatch.validate());
              }
            }
          }
        },        

        'Regular Morphology': {
          topic: new jstp.JSTPDispatch().setMethod("GET"),

          'the Endpoint is not null': {
            'should throw a JSTPInvalidEndpointInRegular': function (dispatch) {
              dispatch.setEndpoint(new jstp.JSTPEndpoint());
              assert.throws(function () {
                dispatch.validate();
              }, jstp.JSTPInvalidEndpointInRegular);
            }
          },

          'the Endpoint is null': {
            topic: new jstp.JSTPDispatch().setMethod("PUT"),

            'the Resource is empty': {
              'should throw a JSTPMissingResourceInRegular': function (dispatch) {
                assert.throws(function () {
                  dispatch.validate();
                }, jstp.JSTPMissingResourceInRegular);    
              }
            },

            'the Resource is not empty': {
              topic: new jstp.JSTPDispatch().setMethod("POST").setResource(["home"]),

              'should return true': function (dispatch) {
                assert.isTrue(dispatch.validate());
              }
            }
          }
        }
      }
    }
  },

  '#getAsEndpoint()': {
    'it should call #validate': function () {
      var dispatch = new jstp.JSTPDispatch()
                         .setResource(["as"]);
      dispatch.validate = function () {
        this.validateWasCalled = true;
      }

      dispatch.getAsEndpoint();
      assert.isTrue(dispatch.validateWasCalled);
    },

    'Regular Morphology': {
      'Method & Resource': {
        'should return a JSTPEndpoint with the method and resource': function () {
          var dispatch = new jstp.JSTPDispatch()
                            .setMethod("PUT")
                            .setResource(["here"]);

          dispatch.validate = function () {};

          var endpoint = dispatch.getAsEndpoint();
          assert.equal(
            endpoint.getMethodPattern(), 
            dispatch.getMethod()
          );
          
          assert.equal(
            endpoint.getResourcePattern().length, 
            dispatch.getResource().length
          );
          
          assert.equal(
            endpoint.getResourcePattern()[0], 
            dispatch.getResource()[0]
          );
        }
      },

      'Method & Resource & From': {
        'should return a JSTPEndpoint with the method, resource and from': function () {
          var dispatch = new jstp.JSTPDispatch()
                             .setMethod("POST")
                             .setResource(["asdfasdf", 123])
                             .setFrom(["home"]);

          dispatch.validate = function () {};

          var endpoint = dispatch.getAsEndpoint();
          assert.equal(
            endpoint.getMethodPattern(), 
            dispatch.getMethod()
          );
          
          assert.equal(
            endpoint.getResourcePattern().length, 
            dispatch.getResource().length
          );
          
          assert.equal(
            endpoint.getResourcePattern()[0], 
            dispatch.getResource()[0]
          );                            
          
          assert.equal(
            endpoint.getResourcePattern()[1], 
            dispatch.getResource()[1]
          );                            

          assert.equal(
            endpoint.getFromPattern().length, 
            dispatch.getFrom().length
          );
          
          assert.equal(
            endpoint.getFromPattern()[0], 
            dispatch.getFrom()[0]
          );                            
        }
      },

      'Method & Resource & To': {
        'should return a JSTPEndpoint with the method, resource and to': function () {
          var dispatch = new jstp.JSTPDispatch()
                             .setMethod("POST")
                             .setResource(["asdfasdf", 123])
                             .setTo(["home"]);

          dispatch.validate = function () {};

          var endpoint = dispatch.getAsEndpoint();
          assert.equal(
            endpoint.getMethodPattern(), 
            dispatch.getMethod()
          );
          
          assert.equal(
            endpoint.getResourcePattern().length, 
            dispatch.getResource().length
          );
          
          assert.equal(
            endpoint.getResourcePattern()[0], 
            dispatch.getResource()[0]
          );                            
          
          assert.equal(
            endpoint.getResourcePattern()[1], 
            dispatch.getResource()[1]
          );                            

          assert.equal(
            endpoint.getToPattern().length, 
            dispatch.getTo().length
          );
          
          assert.equal(
            endpoint.getToPattern()[0], 
            dispatch.getTo()[0]
          );                            
        }
      },

      'Method & Resource & To & From': {
        'should return a JSTPEndpoint with the method, resource, to and from': function () {
          var dispatch = new jstp.JSTPDispatch()
                             .setMethod("POST")
                             .setResource(["asdfasdf", 123])
                             .setFrom(["sweden"])
                             .setTo(["home"]);

          dispatch.validate = function () {};

          var endpoint = dispatch.getAsEndpoint();
          assert.equal(
            endpoint.getMethodPattern(), 
            dispatch.getMethod()
          );
          
          assert.equal(
            endpoint.getResourcePattern().length, 
            dispatch.getResource().length
          );
          
          assert.equal(
            endpoint.getResourcePattern()[0], 
            dispatch.getResource()[0]
          );                            
          
          assert.equal(
            endpoint.getResourcePattern()[1], 
            dispatch.getResource()[1]
          );                            

          assert.equal(
            endpoint.getToPattern().length, 
            dispatch.getTo().length
          );
          
          assert.equal(
            endpoint.getToPattern()[0], 
            dispatch.getTo()[0]
          );  

          assert.equal(
            endpoint.getFromPattern().length, 
            dispatch.getFrom().length
          );
          
          assert.equal(
            endpoint.getFromPattern()[0], 
            dispatch.getFrom()[0]
          );            
        }
      }
    },

    'Answer Morphology': {
      'Method & Resource': {
        'should return a JSTPEndpoint with the method and resource': function () {
          var dispatch = new jstp.JSTPDispatch()
                             .setMethod("ANSWER")
                             .setResource([200, "asdfasdf", "asdfda"]);

          dispatch.validate = function () {};

          var endpoint = dispatch.getAsEndpoint();
          assert.equal(
            endpoint.getMethodPattern(), 
            dispatch.getMethod()
          );
          
          assert.equal(
            endpoint.getResourcePattern().length, 
            dispatch.getResource().length
          );
          
          assert.equal(
            endpoint.getResourcePattern()[0], 
            dispatch.getResource()[0]
          );                            
          
          assert.equal(
            endpoint.getResourcePattern()[1], 
            dispatch.getResource()[1]
          );                            
          
          assert.equal(
            endpoint.getResourcePattern()[2], 
            dispatch.getResource()[2]
          );                     
        }
      },

      'Method & Resource & From': {        
        'should return a JSTPEndpoint with the method, resource and from': function () {
          var dispatch = new jstp.JSTPDispatch()
                             .setMethod("ANSWER")
                             .setResource([404, "asdfasdf", "123"])
                             .setFrom(["home"]);

          dispatch.validate = function () {};

          var endpoint = dispatch.getAsEndpoint();
          assert.equal(
            endpoint.getMethodPattern(), 
            dispatch.getMethod()
          );
          
          assert.equal(
            endpoint.getResourcePattern().length, 
            dispatch.getResource().length
          );
          
          assert.equal(
            endpoint.getResourcePattern()[0], 
            dispatch.getResource()[0]
          );                            
          
          assert.equal(
            endpoint.getResourcePattern()[1], 
            dispatch.getResource()[1]
          );                            

          assert.equal(
            endpoint.getFromPattern().length, 
            dispatch.getFrom().length
          );
          
          assert.equal(
            endpoint.getFromPattern()[0], 
            dispatch.getFrom()[0]
          );     
        }
      }
    },

    'Subscription Morphology': {
      'Method & Endpoint Resource': {
        'should return a JSTPEndpoint with the method and endpoint resource': function () {
          var sourceEndpoint = new jstp.JSTPEndpoint()
                                   .setMethodPattern("*")
                                   .setResourcePattern(["anything"]);

          var dispatch = new jstp.JSTPDispatch()
                             .setMethod("BIND")
                             .setEndpoint(sourceEndpoint);

          dispatch.validate = function () {};

          var endpoint = dispatch.getAsEndpoint();
          assert.equal(
            endpoint.getMethodPattern(), 
            dispatch.getMethod()
          );
          
          assert.equal(
            endpoint.getResourcePattern().length, 
            dispatch.getEndpoint().getResourcePattern().length
          );
          
          assert.equal(
            endpoint.getResourcePattern()[0], 
            dispatch.getEndpoint().getResourcePattern()[0]
          );                            
          
          assert.equal(
            endpoint.getResourcePattern()[1], 
            dispatch.getEndpoint().getResourcePattern()[1]
          );                            

          assert.equal(
            endpoint.getFromPattern().length, 
            dispatch.getFrom().length
          );
          
          assert.equal(
            endpoint.getFromPattern()[0], 
            dispatch.getFrom()[0]
          );     
        }
      },

      'Method & Endpoint Resource & From': {
        'should return a JSTPEndpoint with the method, endpoint resource and from': function () {
          var sourceEndpoint = new jstp.JSTPEndpoint()
                                   .setMethodPattern("*")
                                   .setResourcePattern(["anything"]);

          var dispatch = new jstp.JSTPDispatch()
                             .setMethod("BIND")
                             .setEndpoint(sourceEndpoint)
                             .setFrom(["mars"]);

          dispatch.validate = function () {};

          var endpoint = dispatch.getAsEndpoint();
          assert.equal(
            endpoint.getMethodPattern(), 
            dispatch.getMethod()
          );
          
          assert.equal(
            endpoint.getResourcePattern().length, 
            dispatch.getEndpoint().getResourcePattern().length
          );
          
          assert.equal(
            endpoint.getResourcePattern()[0], 
            dispatch.getEndpoint().getResourcePattern()[0]
          );                            
          
          assert.equal(
            endpoint.getResourcePattern()[1], 
            dispatch.getEndpoint().getResourcePattern()[1]
          );                            

          assert.equal(
            endpoint.getFromPattern().length, 
            dispatch.getFrom().length
          );
          
          assert.equal(
            endpoint.getFromPattern()[0], 
            dispatch.getFrom()[0]
          );               
        }
      },

      'Method & Endpoint Resource & To & From': {
        'should return a JSTPEndpoint with the method, endpoint resource and to': function () {
          var sourceEndpoint = new jstp.JSTPEndpoint()
                                   .setMethodPattern("*")
                                   .setResourcePattern(["anything"]);

          var dispatch = new jstp.JSTPDispatch()
                             .setMethod("BIND")
                             .setFrom(["mercury"])
                             .setTo(["the sun"])                             
                             .setEndpoint(sourceEndpoint);

          dispatch.validate = function () {};

          var endpoint = dispatch.getAsEndpoint();
          assert.equal(
            endpoint.getMethodPattern(), 
            dispatch.getMethod()
          );
          
          assert.equal(
            endpoint.getResourcePattern().length, 
            dispatch.getEndpoint().getResourcePattern().length
          );
          
          assert.equal(
            endpoint.getResourcePattern()[0], 
            dispatch.getEndpoint().getResourcePattern()[0]
          );                            
          
          assert.equal(
            endpoint.getResourcePattern()[1], 
            dispatch.getEndpoint().getResourcePattern()[1]
          );                            

          assert.equal(
            endpoint.getFromPattern().length, 
            dispatch.getFrom().length
          );
          
          assert.equal(
            endpoint.getFromPattern()[0], 
            dispatch.getFrom()[0]
          );                            

          assert.equal(
            endpoint.getToPattern().length, 
            dispatch.getTo().length
          );
          
          assert.equal(
            endpoint.getToPattern()[0], 
            dispatch.getTo()[0]
          );               
        }
      }
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
      'should return false': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setMethod("SOMETHING");
        assert.isFalse(dispatch.isOfAnswerMorphology());
      }
    }
  },

  '#isOfRegularMorphology()': {
    'has the GET method': {
      'should return true': function () {        
        assert.isTrue(
          new jstp.JSTPDispatch()
            .setMethod("GET")
            .isOfRegularMorphology()
        );
      }
    },
    'has the POST method': {
      'should return true': function () {        
        assert.isTrue(
          new jstp.JSTPDispatch()
            .setMethod("POST")
            .isOfRegularMorphology()
        );
      }
    },
    'has the PUT method': {
      'should return true': function () {        
        assert.isTrue(
          new jstp.JSTPDispatch()
            .setMethod("PUT")
            .isOfRegularMorphology()
        );
      }
    },
    'has the DELETE method': {
      'should return true': function () {        
        assert.isTrue(
          new jstp.JSTPDispatch()
            .setMethod("DELETE")
            .isOfRegularMorphology()
        );
      }
    },
    'has the PATCH method': {
      'should return true': function () {        
        assert.isTrue(
          new jstp.JSTPDispatch()
            .setMethod("PATCH")
            .isOfRegularMorphology()
        );
      }
    },
    'has an unrecognized method': {
      'should return true': function () {        
        assert.isTrue(
          new jstp.JSTPDispatch()
            .setMethod("UNRECOGNIZED")
            .isOfRegularMorphology()
        );
      }
    },
    'has the BIND method': {
      'should return false': function () {        
        assert.isFalse(
          new jstp.JSTPDispatch()
            .setMethod("BIND")
            .isOfRegularMorphology()
        );
      }
    },
    'has the RELEASE method': {
      'should return false': function () {        
        assert.isFalse(
          new jstp.JSTPDispatch()
            .setMethod("RELEASE")
            .isOfRegularMorphology()
        );
      }
    },
    'has the ANSWER method': {
      'should return false': function () {        
        assert.isFalse(
          new jstp.JSTPDispatch()
            .setMethod("ANSWER")
            .isOfRegularMorphology()
        );
      }
    }
  },

  '#isOfSubscriptionMorphology()': {    
    'has the BIND method': {
      'should return true': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setMethod("BIND");
        assert.isTrue(dispatch.isOfSubscriptionMorphology());
      }
    },
    'has the RELEASE method': {
      'should return true': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setMethod("RELEASE");
        assert.isTrue(dispatch.isOfSubscriptionMorphology());
      }
    },
    'has neither the BIND nor the RELEASE method': {
      'should return false': function () {
        var dispatch = new jstp.JSTPDispatch();
        dispatch.setMethod("DIFFERENT");
        assert.isFalse(dispatch.isOfSubscriptionMorphology());
      }      
    }
  }
}).export(module); 