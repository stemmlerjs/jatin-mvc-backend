
let mongoUsername = 'root'
let mongoPassword = 'example';

export const config = {
  mongoUrl: `mongodb://${mongoUsername}:${mongoPassword}@localhost:27017`,
  mongoDatabase: '',
  port: 3000,
};
