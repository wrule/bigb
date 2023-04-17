import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import { io as ioClient } from 'socket.io-client';

const app = express();
const server = http.createServer(app);
const ioServer = new Server(server, { cors: { origin: '*' } });
server.listen(3000);

app.get('/api', (req, res) => {
  res.send({ message: 'Hello World!' });
});

ioServer.on('connection', (socket) => {
  console.log(socket.id, '服务端连接');
});

setTimeout(() => {
  const client = ioClient('http://localhost:3000');
  client.on('connect', () => {
    console.log(client.id, '客户端连接');
  });
}, 5000);