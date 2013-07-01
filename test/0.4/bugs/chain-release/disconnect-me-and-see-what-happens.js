var jstp = require('../../../../index.js');

jstp.bind({
  host: [['localhost', 44444, 'tcp']],
  endpoint: {
    method: "PUT",
    resource: ['a', 'deeply', 'endpoint']
  }
});