
interface DatabaseConfig {
  url: string;
  host: string;
  username: string;
  password: string;
  databaseName: string;
}

interface ServerConfig {
  port: number;
}

interface Config {
  databaseConfig: DatabaseConfig;
  serverConfig: ServerConfig;
}

export class ApplicationConfig {

  private config: Config;

  constructor (config: Config) {
    this.config = config;
  }

  getServerConfig (): ServerConfig {
    return this.config.serverConfig;
  }

  getDatabaseConfig (): DatabaseConfig {
    return this.config.databaseConfig;
  }
}