

import { MongoDBConnection } from './shared/infra/database/mongoDBConnection';
import { RestfulAPI } from './shared/infra/api/restfulAPI';
import { resetDatabase } from './shared/scripts/resetDatabase';

export class WebTestDriver {
  
  private api: RestfulAPI;
  private mongo: MongoDBConnection;

  constructor (api: RestfulAPI, mongo: MongoDBConnection) {
    this.api = api;
    this.mongo = mongo;
  }

  async start () {
    // Start the database
    await this.mongo.start();

    await resetDatabase(this.mongo);

    await this.api.start();
    
  }

  async stop () {
    // Start the database
    await this.mongo.stop();

    // Start express
    await this.api.stop();
  }

  getAPIInstance () {
    return this.api.getInstance();
  }
}

// const request = require('supertest');
//       const express = require('express');

//       const app = express();

//       app.get('/user', function(req, res) {
//         res.status(200).json({ name: 'john' });
//       });