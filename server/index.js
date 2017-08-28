import Client from './client';
var io = require('socket.io')();

io.on('connection', function (client) {
  let c = new Client(client);
});

io.listen(3000);
