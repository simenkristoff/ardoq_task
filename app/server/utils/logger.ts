import fs from 'fs';
import path from 'path';

import winston from 'winston';

const DIR_PATH = './server/logs';

// Creates log directory if it doesn't exist.
const logDirectory = path.join(DIR_PATH);
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Setup formats
const alignedWithColorsAndTime = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...args } = info;

    const ts = timestamp.slice(0, 19).replace('T', ' ');
    return `${ts} [${level}]: ${message.trim()} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
    }`;
  }),
);

/**
 * Setup new Logger
 * @type {winston.Logger}
 */
export const Logger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'app.log',
      dirname: DIR_PATH,
      handleExceptions: true,
      format: winston.format.combine(winston.format.json(), winston.format.colorize()),
      maxsize: 5242880,
      maxFiles: 25,
    }),
    new winston.transports.Console({
      handleExceptions: true,
      format: alignedWithColorsAndTime,
    }),
  ],
  exitOnError: false,
});
