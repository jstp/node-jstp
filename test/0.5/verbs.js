var JSTP = require('../../lib/jstp');

JSTP.post({resource: ["Lol"], host:[["localhost", 33333, "tcp"]]});

JSTP.release({resource: ["Cat"]});

JSTP.patch({resource: ["Cat", "MrWinkers"], body: {paws: 4}});

JSTP.delete({resource: ["Lord", "Voldemort"], host: [["localhost", 33333, "tcp"]]});