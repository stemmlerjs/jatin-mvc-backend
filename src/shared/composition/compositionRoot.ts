
import { ApplicationConfig } from "../../config";
import { MongoDB } from "../../mongoDB";
import { RestfulAPI } from "../infra/api/restfulAPI";
import { createUserControllerFactory } from "../infra/api/controller";
import { WebTestDriver } from "../../webTestDriver";
import { UserService } from "../../modules/users/services/userService";
import { userRoute } from '../infra/api/route/index'

let userService  = new UserService();
export let createUserController = createUserControllerFactory(userService);


/**
 * @class CompositionRoot
 * @type Structurer
 * 
 * - to build the various dependencies
 * - to link dependencies together
 * - to know which dependency is the correct one for the context 
 *  (dev, prod, test)
 */

export class CompositionRoot {
  private mongo: MongoDB;
  private api: RestfulAPI;
  private webTestDriver: WebTestDriver;
  private applicationConfig: ApplicationConfig;

  constructor () {
    this.applicationConfig = this.createApplicationConfig();
    this.mongo = this.createMongoDB()
    this.api = this.createRestfulAPI();
    this.webTestDriver = this.createWebTestDriver();
  }

  private createApplicationConfig () {
    let mongoUsername = 'root'
    let mongoPassword = 'example';
    let mongoHost = 'localhost'

    return new ApplicationConfig({
      databaseConfig: {
        url: `mongodb://${mongoUsername}:${mongoPassword}@${mongoHost}:27017`,
        databaseName: '',
        password: mongoPassword,
        username: mongoUsername,
        host: mongoHost
      },
      serverConfig: {
        port: 3000
      }
    })
  }

  private createMongoDB () {
    const databaseConfig = this.applicationConfig.getDatabaseConfig()
    return new MongoDB({ mongoUrl: databaseConfig.url });
  }

  private createRestfulAPI () {
    return new RestfulAPI(this.applicationConfig.getServerConfig(), {
      // TODO;
      userRoute
    });
  }

  private createWebTestDriver () {
    let mongo = this.getMongo();
    let api = this.getAPI();
    return new WebTestDriver(api, mongo)
  }

  getMongo () {
    if (!this.mongo) throw new Error('Mongo not yet created');
    return this.mongo;
  }

  getAPI () {
    if (!this.api) throw new Error('API not yet created');
    return this.api;
  }

  getWebTestDriver () {
    if (!this.webTestDriver) throw new Error('Web test driver not yet created');
    return this.webTestDriver;
  }
}


/**
 * npm run start
 */
