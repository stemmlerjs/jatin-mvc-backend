
import * as Express from 'express'
import { mongooseFactory } from '.';
import http from 'http';

interface ServerConfig {
  port: number;
}

export class Server {

  private express: Express.Application;
  private http: http.Server | undefined;
  
  private database: {
    start: () => Promise<typeof import("mongoose")>;
  }
  private serverConfig: ServerConfig;

  constructor (express: Express.Application, serverConfig: ServerConfig) {
    this.express = express;
    this.database = mongooseFactory()
    this.serverConfig = serverConfig;
  }

  async start () {
    // Start the database
    // await this.database.start();

    // Start express
    this.http = this.express.listen(this.serverConfig.port);
  }

  async stop () {
    // Stop express
    // Stop the database

    this.http?.close();
  }

  getHttp () {
    return this.http
  }

}

// const request = require('supertest');
//       const express = require('express');

//       const app = express();

//       app.get('/user', function(req, res) {
//         res.status(200).json({ name: 'john' });
//       });