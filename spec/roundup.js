var vows    = require('vows')
  , assert  = require('assert')
  , jstp    = require('../index.js');

vows.describe('article').addBatch({
  'BIND GET and GET': {
    topic: function () {
      jstp.use('demo', {
        'article': {
          get: this.callback
        }
      });

      jstp.get('article');
    },

    'is GET': function (message) {
      assert.equal(message.method, 'GET');
    },
    'has the Engine': function (message) {
      assert.equal(message.engine, jstp);
    },
    'has no Body': function (message) {
      assert.isNull(message.body);
    },
    'the `from` is set to `demo`': function (message) {
      assert.equal(message.from[0], 'demo');
    },
    'the Resource is set to `article`': function (message) {
      assert.equal(message.resource.length, 1);
      assert.equal(message.resource[0], 'article');
    }
  },

  'some Body and an ANSWER': {
    topic: function () {
      jstp.use('demo', {
        'user': {
          put: function (message) {
            message.engine.answer(200, message.body);
          }
        }
      });

      jstp.put(
        'user', 
        'my drinking is killing me', 
        this.callback
      );
    },

    'is 200 ANSWER': function (message) {
      assert.equal(message.status, 200);
      assert.isNotUndefined(message.answer);
    },
    'has the right body': function (message) {
      assert.equal(message.body, 'my drinking is killing me');
    }
  },

  'capture double remote `to` from a specific `from` and pattern': {
    topic: function () {
      jstp.use('testme', {
        'jstp.info:80:ws,testme//run/:someparam//demo': {
          '*': this.callback
        }
      });

      jstp.use('demo', {
        'repeater/:towhere': {
          post: function (message) {
            message.engine.put({
              'jstp.info:80:ws,testme//run/withstuff': {
                address: message.params.towhere
              }
            });
          }
        }
      });
      
      jstp.post('repeater/tothesky');
    }, 
    'has the right Body': function (message) {
      assert.equal(message.body.address, "tothesky");
    }
  },

  'send a BIND back in the channel': {
    topic: function () {
      jstp.use(jstp.modules.tcp(8000));

      jstp.use('rejilla', {
        'rejilla//theid': {
          bind: function (message) {
            message.answer.post('back', 'This goes back!');
          }
        }
      });

      jstp.use('local', {
        'back': {
          post: this.callback
        }
      });

      jstp.bind('localhost:8000:tcp,rejilla//theid');

    },

    'should have a localhost:8000:tcp,rejilla `from`': function (message) {
      assert.equal(message.method, "POST");
      assert.equal(message.from[0], "localhost:8000:tcp");
      assert.equal(message.from[1], "rejilla");
    },

    'should have no `to`': function (message) {
      assert.equal(message.to.length, 0);
    },

    'should have the right body': function (message) {
      assert.equal(message.body, 'This goes back!');
    }
  },

  'patterns everywhere': {
    topic: function () {
      jstp.use('patterned', {
        '...//:here/.../*//:manyoptions,...': {
          '*': this.callback
        }
      });

      jstp.put('local,remote,everywhere//options/and/more/options//ok,bar', 'Mad message');
    },

    'it should match': function (message) {
      assert.equal(message.body, "Mad message");
    }
  }

}).export(module); 