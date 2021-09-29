import http from 'http';

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Server } from 'socket.io';

import { Logger } from '../utils';

/**
 * class StationSocket.
 * Creates a stream which polls data from the bikesharing api,
 * and streams the returned data to all connected sockets.
 * @class {@link StationSocket}
 */
class StationSocket {
  // Poll interval
  private POLL_TIME = 10000;
  // Time to wait before retrying failed requests.
  private RETRY_TIMEOUT = 5000;
  private io: Server;

  /**
   * Initializes the socket.
   * @param {http.Server} server the server to run the service on
   */
  constructor(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET'],
      },
    });

    this.io.on('connection', async (socket) => {
      Logger.info(`Socket ${socket.id} connected`);
      let interval: NodeJS.Timeout | null = null;
      try {
        // Send data once connected.
        this.fetchStreamData(false).then((res) => {
          if (res) {
            socket.emit('data', res.data);
          }
        });
        // Setup interval polling data in a given interval.
        interval = setInterval(() => {
          this.fetchStreamData().then((res) => {
            if (res) {
              socket.emit('data', res.data);
            }
          });
        }, this.POLL_TIME);
      } catch (err) {
        this.io.emit('error', 'Could not connect');
      }
      socket.on('disconnect', () => {
        // Clear interval for the disconnected socket.
        if (interval) {
          clearInterval(interval);
        }
        Logger.info(`Socket ${socket.id} disconnected`);
      });
    });
  }

  /**
   * Fetch stream data from the bikesharing api.
   * @param retry whether to retry the request on fail
   * @returns {Promise<AxiosResponse | null>} response, or null on fail
   */
  private async fetchStreamData(retry = true): Promise<AxiosResponse | null> {
    const config: AxiosRequestConfig = {
      headers: {
        'Client-Identifier': 'simen-kristoffersen',
        'Content-Type': 'application/json',
      },
      timeout: 3000,
    };
    return axios
      .get('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json', config)
      .catch((err: Error | AxiosError) => {
        const { message } = err;
        Logger.error(message);
        if (retry) return this.wait(this.RETRY_TIMEOUT).then(() => this.fetchStreamData());
        return null;
      });
  }

  /**
   * Wait ms time.
   * @param ms time to wait
   */
  private wait(ms: number) {
    Logger.info(`Waiting ${ms}ms`);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default StationSocket;
