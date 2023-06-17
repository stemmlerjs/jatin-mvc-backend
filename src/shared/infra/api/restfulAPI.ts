
import express from 'express';
import * as Express from 'express'
import http from 'http';
import { UserRouter } from './userRouter';

interface ServerConfig {
  port: number;
}

interface Routes {
  userRouter: UserRouter;
}

export class RestfulAPI {
  private instance: Express.Application;
  private http: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | undefined;
  private serverConfig: ServerConfig;

  constructor (serverConfig: ServerConfig, routes: Routes) {
    this.serverConfig = serverConfig;
    this.instance = this.setupInstance();
    this.setupRoutes(routes);
  }

  setupInstance () {
    return express();
  }

  getInstance () {
    return this.instance;
  }

  setupRoutes (routes: Routes) {
    this.instance.use(express.json());
    this.instance.use(express.urlencoded({ extended: true }));
    this.instance.get('/health', (req, res) => {
      res.json({ ok: true });
    });
    this.instance.use('/user', routes.userRouter.getRouter());
  }

  async start(): Promise<void> {
    this.http = this.instance.listen(this.serverConfig.port, () => {
      console.log(`server started, running on port ${this.serverConfig.port}`)
    });

    this.http.once('error', (err: Error) => {
      console.log(err)
    });

    this.http.once('listening', () => {
      console.log('listening for requests')
    });
  }

  async stop(): Promise<void> {
    if (!this.http) {
      return;
    }
    this.http.close()
  }

}