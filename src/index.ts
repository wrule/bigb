import http from 'http';
import express from 'express';
import SocketIO from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);
server.listen(3000);
