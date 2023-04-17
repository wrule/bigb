import http from 'http';
import express, { Express } from 'express';
import { Server } from 'socket.io';
import { io as ioClient } from 'socket.io-client';
import axios from 'axios';

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
  public constructor(
    private readonly hostname: string,
    private readonly portRange: [number, number],
    private readonly welcome = 'bigbServer',
  ) { }

  public async fetchWelcome(port: number) {
    try {
      const res = await axios.get(`http://${this.hostname}:${port}/welcome`, { timeout: 10000 });
      if (res.data === this.welcome) return this.welcome;
    } catch (e) { }
    return '';
  }

  public fetchAllWelcome() {
    return Promise.all(this.portRange.map((port) => this.fetchWelcome(port)));
  }

  public createServer() {

  }

  public createSubscriber() {

  }
}


async function main() {
  const b = new BigbServer(19999);
  b.Start();
  const a = new Bigb('localhost', [20000, 20010]);
  const c = await a.
  console.log(c);
}

main();