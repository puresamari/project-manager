import Client from './client';
import { server } from '../settings';
var io = require('socket.io')();

io.on('connection', function (client) {
  let c = new Client(client);
});

io.listen(server.port);
