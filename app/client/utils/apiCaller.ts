import axios, { AxiosResponse, Method } from 'axios';

const HOST = process.env.HOST ? process.env.HOST : 'http://localhost';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

/**
 * Wrapper for API requests
 * @param method the HTTP-method
 * @param path the api path
 * @param data the data to send (optional)
 */
export const apiCaller = (method: Method, path: string, data?: any): Promise<any> => {
  return axios({ url: `${HOST}:${PORT}/api${path}`, method })
    .then((response: AxiosResponse) => response.data)
    .catch();
};
