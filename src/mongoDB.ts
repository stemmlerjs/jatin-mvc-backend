
import * as mongoose from 'mongoose';

interface MongoConfig {
  mongoUrl: string;
}

export class MongoDB {
  private mongoConfig: MongoConfig;
  private instance: any;

  constructor (mongoConfig: MongoConfig) {
    this.mongoConfig = mongoConfig;
  }

  async start () {
    this.instance = await mongoose.connect(this.mongoConfig.mongoUrl);
    console.log(`Mongo started at ${this.mongoConfig.mongoUrl}`);
  }

  async stop () {
    this.instance.disconnect();
  }
}