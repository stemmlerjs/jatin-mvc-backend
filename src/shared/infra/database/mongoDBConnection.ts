
import * as mongoose from 'mongoose';
import { MongoModels } from './models';

interface MongoConfig {
  mongoUrl: string;
}

export class MongoDBConnection {
  private mongoConfig: MongoConfig;
  private instance: any;
  private models: MongoModels;

  constructor (mongoConfig: MongoConfig) {
    this.mongoConfig = mongoConfig;
    this.models = new MongoModels();
  }

  async start () {
    this.instance = await mongoose.connect(this.mongoConfig.mongoUrl);
    console.log(`Mongo started at ${this.mongoConfig.mongoUrl}`);
  }

  async stop () {
    this.instance.disconnect();
  }

  getInstance () {
    return this.instance;
  }

  getModels () {
    return this.models.getModels();
  }

}