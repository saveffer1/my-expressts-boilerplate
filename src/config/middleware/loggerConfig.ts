import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import morgan, { FormatFn } from 'morgan';
import { Handler, Request, Response } from 'express';

const isProduction = process.env.NODE_ENV === 'production';

export const logger: winston.Logger = winston.createLogger({
   /**
    * Configured Winston logger for logging messages with different formats and transports.
    *
    * @constant
    * @type {winston.Logger}
    *
    * @property {string} level - The logging level for the logger. Messages with this level and above will be logged.
    * @property {winston.Format} format - The format of the log messages.
    * @property {Array<winston.transport.TransportStreamOptions>} transports - The transports where the logs will be sent.
    *
    * @property {winston.format.Format} format.timestamp - Adds a timestamp to each log message.
    * @property {winston.format.Format} format.printf - Formats the log message into a string with timestamp and log level.
    * @property {winston.format.Format} format.json - Serializes the log message as JSON.
    *
    * @property {boolean} isProduction - Flag indicating if the environment is production. Determines whether to include console transport.
    *
    * @property {winston.transports.ConsoleOptions} transports.Console - Console transport for logging to the terminal.
    * @property {winston.transports.DailyRotateFileOptions} transports.DailyRotateFile - DailyRotateFile transport for rotating log files.
    * @property {string} transports.DailyRotateFile.filename - The file name pattern for log files.
    * @property {string} transports.DailyRotateFile.datePattern - The pattern for the date in log file names.
    * @property {boolean} transports.DailyRotateFile.zippedArchive - Whether to zip archived log files.
    * @property {string} transports.DailyRotateFile.maxSize - The maximum size of a log file before it rotates.
    * @property {string} transports.DailyRotateFile.maxFiles - The maximum number of days to keep log files.
    *
    * @see {@link https://github.com/winstonjs/winston}
    * 
    */
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD-MM-YYYY-HH:mm:ss'
        }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        }),
        winston.format.json(),
    ),
    transports: [
        ...(isProduction ? [] : [new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'HH:mm:ss'
                }),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
                }),
            ),
        })]),
        new DailyRotateFile({
            filename: 'logs/learnify-backend-%DATE%.log',
            datePattern: 'DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '40m',
            maxFiles: '14d',
        }),
    ],
});

// Create a stream for Morgan to use Winston
const stream = {
    write: (message: string) => {
        logger.info(message.trim());
    }
};

const morganConfig: FormatFn<Request, Response> = function (tokens, req, res) {
   /**
    * Custom Morgan format function for logging HTTP requests.
    *
    * @function
    * @param {Function} tokens - Function to get various tokens related to the request and response.
    * @param {Request} req - The Express request object.
    * @param {Response} res - The Express response object.
    * 
    * @returns {string} - The formatted log string.
    * 
    * @property {string} method - The HTTP method of the request (e.g., GET, POST).
    * @property {string} url - The URL of the request.
    * @property {string} status - The HTTP status code of the response.
    * @property {string} contentLength - The content length of the response in bytes.
    * @property {string} responseTime - The time taken to respond to the request in milliseconds.
    * @property {string} ip - The IP address of the client making the request.
    *
    * @see {@link https://github.com/expressjs/morgan}
    * 
    */ 
    const method = tokens.method ? tokens.method(req, res) : 'N/A';
    const url = tokens.url ? tokens.url(req, res) : 'N/A';
    const status = tokens.status ? tokens.status(req, res) : 'N/A';
    const contentLength = tokens.res ? tokens.res(req, res, 'content-length') || '0' : 'N/A';
    const responseTime = tokens['response-time'] ? tokens['response-time'](req, res) : 'N/A';
    const ip = req.ip || req.socket.remoteAddress;

    return [
        'IP: ' + ip,
        method,
        url,
        'status: '+ status,
        'lenght:', contentLength, 'bytes',
        responseTime, 'ms'
    ].join(' ');
};

// Create a middleware function using Morgan and stream for Winston
export const httpLogger: Handler = morgan(morganConfig, {
    stream,
});
