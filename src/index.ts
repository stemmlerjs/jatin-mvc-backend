
import mongoose from 'mongoose';
import { config } from './config';
import app from './app';
import http from 'http';

let server: http.Server;

let mongooseFactory = () => {
  return {
    start: () => mongoose.connect(config.mongoUrl)
  }
}

export { mongooseFactory }

// // Start mongo
// mongoose.connect(config.mongoUrl).then(() => {
//   console.log('Connected to MongoDB');

//   // Start express
//   server = app.listen(config.port, () => {
//     console.log(`Listening to port ${config.port}`);
//   });
  
// });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});
