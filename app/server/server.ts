/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config';
import App from './app';
import { StationController } from './controllers';
import { Logger } from './utils';

// eslint-disable-next-line no-new
new App([new StationController()]);

// Handle unhandled rejections.
process.on('unhandledRejection', (err: any) => {
  Logger.error(err.name, err.message);
  Logger.debug('UNHANDLED REJECTION! 💥 Shutting down...');
  process.exit(1);
});

// Handle unhandled exceptions.
process.on('uncaughtException', (err: any) => {
  Logger.error(err.name, err.message);
  Logger.debug('UNCAUGHT EXCEPTION! 💥 Shutting down...');

  process.exit(1);
});
