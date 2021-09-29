import http from 'http';
import path from 'path';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { loggerMiddleware } from './middlewares';
import { StationSocket } from './sockets';
import { ControllerInterface } from './types';
import { Logger } from './utils';

dotenv.config({ path: path.resolve(__dirname, '.env') });
/**
 * Class App. The wrapper class for the backend-service. The servers logic and configuration is
 * initialized in this class.
 * @class {@link App}
 */
class App {
  private PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
  private app: express.Application;
  private server: http.Server;

  /**
   * Creates the App.
   * @param {ControllerInterface[]} controllers array of the route controllers to be initialized
   */
  constructor(controllers: ControllerInterface[]) {
    this.app = express();
    this.app.use(cors({ origin: '*' }));
    this.app.use(loggerMiddleware);
    this.server = http.createServer(this.app).listen(this.PORT, () => {
      Logger.info(`Server running on port: ${this.PORT} `);
    });
    this.setupRoutes(controllers);
    // eslint-disable-next-line no-new
    new StationSocket(this.server);
  }

  /**
   * Initializes the backend-endpoints with controllers.
   * @param {ControllerInterface[]} controllers array of the route controllers to be initialized
   */
  private setupRoutes(controllers: ControllerInterface[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }
}

export default App;
