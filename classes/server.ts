import { SERVER_PORT } from './../global/environment';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

  private static _instance: Server;

  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  public httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);

    this.escucharSockets()
  }

  private escucharSockets() {
    console.log('Escuchando conexiones ...');
    this.io.on('connection', cliente => {
      console.log('Cliente conectado!');
      socket.desconectar(cliente);
      socket.mensaje(cliente, this.io);
    })
  }

  public static get instance {
    return this._instance || (this._instance = new this());
  }

  start(callback: any) {
    this.httpServer.listen(this.port, callback);
  }
}