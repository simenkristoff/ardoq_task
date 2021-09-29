/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from 'axios';
import { Request, Response, NextFunction, Router } from 'express';

import { ControllerInterface } from '../types';
import { Logger } from '../utils';

/**
 * Api controller for '/stations'-endpoint.
 * @class StationController
 * @implements {ControllerInterface}
 */
class StationController implements ControllerInterface {
  public endpoint = '/stations';
  public router;

  /**
   * Initializes StationController
   */
  constructor() {
    this.router = Router();
    this.router.get(this.endpoint, this.get);
  }

  /**
   * GET all stations in Oslo.
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    axios
      .get('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json')
      .then((response) => {
        res.status(200).send(response.data.data);
      })
      .catch((err: Error | AxiosError) => {
        let status = 403;
        const { name, message } = err;
        if (axios.isAxiosError(err)) {
          status = 500;
          if (err.response) {
            status = err.response.status;
          }
        }
        Logger.error(message);
        res.status(status).send({ name, message });
      });
  }
}

export default StationController;
