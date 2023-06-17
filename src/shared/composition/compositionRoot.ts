
import { ApplicationConfig } from "../../config";
import { MongoDBConnection } from "../infra/database/mongoDBConnection";
import { RestfulAPI } from "../infra/api/restfulAPI";
import { WebTestDriver } from "../../webTestDriver";
import { UserService } from "../../modules/users/application/userService";
import { MongoUserRepo } from "../../modules/users/infra/mongoUserRepo";
import { UserRepo } from "../../modules/users/infra/userRepo";
import { UserController } from "../infra/api/usersController";
import { UserRouter } from "../infra/api/userRouter";

/**
 * @class CompositionRoot
 * @type 
 * 
 * - to build the various dependencies
 * - to link dependencies together
 * - to know which dependency is the correct one for the context 
 *  (dev, prod, test)
 */

export class CompositionRoot {
  private mongoDBConnection: MongoDBConnection;
  private api: RestfulAPI;

  private userRepo: UserRepo;
  private userService: UserService;
  private userController: UserController;
  private userRouter: UserRouter;

  private webTestDriver: WebTestDriver;
  private applicationConfig: ApplicationConfig;

  constructor () {
    this.applicationConfig = this.createApplicationConfig();
    this.mongoDBConnection = this.createMongoDB()
    this.userRepo = this.createUserRepo();
    this.userService = this.createUserService()
    this.userController = this.createUserController();
    this.userRouter = this.createUserRouter();
    this.api = this.createRestfulAPI();
    this.webTestDriver = this.createWebTestDriver();
  }

  private createUserRouter () {
    let userController = this.getUserController();
    return new UserRouter(userController);
  }

  private createUserController () {
    let userService = this.getUserService();
    return new UserController(userService);
  }

  private createUserService () {
    let userRepo = this.getUserRepo();
    return new UserService(userRepo);
  }

  private createUserRepo () {
    let mongoDBConnection = this.getMongoDBConnection()
    return new MongoUserRepo(mongoDBConnection)
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
    return new MongoDBConnection({ mongoUrl: databaseConfig.url });
  }

  private createRestfulAPI () {
    let userRouter = this.getUserRouter();
    return new RestfulAPI(this.applicationConfig.getServerConfig(), { userRouter });
  }

  private createWebTestDriver () {
    let mongo = this.getMongoDBConnection();
    let api = this.getAPI();
    return new WebTestDriver(api, mongo)
  }

  getMongoDBConnection () {
    if (!this.mongoDBConnection) throw new Error('Mongo not yet created');
    return this.mongoDBConnection;
  }

  getAPI () {
    if (!this.api) throw new Error('API not yet created');
    return this.api;
  }

  getWebTestDriver () {
    if (!this.webTestDriver) throw new Error('Web test driver not yet created');
    return this.webTestDriver;
  }

  getUserService () {
    if (!this.userService) throw new Error('User service not yet created');
    return this.userService;
  }

  getUserRepo () {
    if (!this.userRepo) throw new Error('User repo not yet created');
    return this.userRepo;
  }

  getUserController () {
    if (!this.userController) throw new Error('User controller not yet created');
    return this.userController;
  }

  getUserRouter () {
    if (!this.userRouter) throw new Error('User router not yet created');
    return this.userRouter;
  }
}


/**
 * npm run start
 */
