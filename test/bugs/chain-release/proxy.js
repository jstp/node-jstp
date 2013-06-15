var jstp = require('../../../index.js');

var proxy = {
  remote: function (dispatch) {
    console.log("Will never get here");
  },

  bind: function (dispatch) {
    jstp.bind({
      host: [['localhost', 33333, 'tcp']],
      endpoint: dispatch.endpoint
    }, this.remote, this); 
  },
  release: function (dispatch) {
    console.log("RELEASED");
    jstp.release({
      host: [['localhost', 33333, 'tcp']],
      endpoint: dispatch.endpoint
    }, this.remote, this); 
  }
}

jstp.bind({
  endpoint: {
    method: "BIND",
    resource: ['a', 'deeply', 'endpoint']
  }
}, proxy.bind, proxy);

jstp.bind({
  endpoint: {
    method: 'RELEASE',
    resource: ['a', 'deeply', 'endpoint']
  }
}, proxy.release, proxy);

jstp.listen({
  tcp: 44444
});