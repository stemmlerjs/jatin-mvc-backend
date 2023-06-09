
import * as Express from 'express'
import http from 'http';
import { MongoDB } from './mongoDB';

interface ServerConfig {
  port: number;
}

export class TestHarness {
  private express: Express.Application;
  private http: http.Server | undefined;
  private mongo: MongoDB;

  private serverConfig: ServerConfig;

  constructor (express: Express.Application, mongo: MongoDB, serverConfig: ServerConfig) {
    this.express = express
    this.mongo = mongo;
    this.serverConfig = serverConfig;
  }

  async start () {
    // Start the database
    await this.mongo.start();

    // Start express
    this.http = this.express.listen(this.serverConfig.port);
  }

  async stop () {
    // Start the database
    await this.mongo.stop();

    // Start express
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