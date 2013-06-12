var jstp = require('../../index.js');

var Article = {
  bindDad: function (dispatch) {
    jstp.post({
      host: [['localhost', 33333, 'tcp']],
      resource: ['Article', '*', 'comments'],
      body: {
        filters: { tag: 'spamable' },
        data: "SPAM SPAM SPAM"
      }
    });
  },

  bindSon: function (dispatch) {
    if (dispatch.referer[0] == 'Monje') console.log(dispatch);
  }
}

jstp.bind({
  host: [['localhost', 33333, 'tcp']],
  endpoint: {
    method: 'PUT',
    resource: ['Article', '*']
  }
}, Article.bindDad, Article)
.bind({
  host: [['localhost', 33333, 'tcp']],
  endpoint: {
    method: 'POST',
    resource: ['Article', '*', '*']
  }
}, Article.bindSon, Article);



setTimeout( function () {
  jstp.post({
    host: [['localhost', 33333, 'tcp']],
    resource: ['Article'],
    body: {
      title: "This articles are just there for the only purpose of being spammed upon",
      tag: 'spamable',
      comments: []
    }
  }).post({
    host: [['localhost', 33333, 'tcp']],
    resource: ['Article'],
    body: {
      title: "This should also be spammed",
      tag: 'spamable',
      comments: []
    }
  }).post({
    host: [['localhost', 33333, 'tcp']],
    resource: ['Article'],
    body: {
      title: "And this, why not?",
      tag: 'spamable',
      comments: []
    }
  });
}, 1000);