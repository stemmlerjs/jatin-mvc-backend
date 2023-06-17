
import * as express from 'express';
import { UserController } from './usersController';

export class UserRouter {
  private router: express.Router;

  constructor(usersController: UserController) {
    this.router = this.setupRouter(usersController);
  }

  setupRouter(usersController: UserController) {
    let router = express.Router();

    router.post('/', (req, res) => usersController.create(req, res));
    router.put('/', (req, res) => usersController.edit(req, res));

    return router;
  }

  getRouter () {
    return this.router;
  }
}
