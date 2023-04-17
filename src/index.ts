import http from 'http';
import express, { Express } from 'express';
import { Server } from 'socket.io';
import { io as ioClient } from 'socket.io-client';

export
class BigbServer {
  public constructor(private readonly port: number) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.ioServer = new Server(this.server, { cors: { origin: '*' } });
  }

  private readonly app!: Express;
  private readonly server!: http.Server;
  private readonly ioServer!: Server;

  public Start(
    welcome = 'bigbServer',
    expressApp?: (app: Express) => void,
    socketIOApp?: (ioServer: Server) => void,
  ) {
    expressApp?.(this.app);
    socketIOApp?.(this.ioServer);
    this.app.get('/welcome', (req, res) => res.send(welcome));
    this.server.listen(this.port);
  }
}

export
class Bigb {
  public constructor(portRange: [number, number]) { }

  public createServer() {

  }

  public createSubscriber() {

  }
}

const b = new BigbServer(19999);
b.Start();