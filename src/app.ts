import express, { Request, Response} from 'express';
import http2Express from 'http2-express-bridge';
import http2 from 'node:http2';
import fs from 'fs';
import path from 'path';

import * as middlewareConfig from './config/middlewareConfig';
import router from './routes/router';

// const env = process.env.NODE_ENV;
const PORT = process.env.BACKEND_ENV_PORT || 5000;
const CERT_DIR = `${path.resolve(__dirname, '../cert')}`;

const logger = middlewareConfig.logger;

const app = http2Express(express);

const options = {
  key: fs.readFileSync(`${CERT_DIR}/server.key`),
  cert: fs.readFileSync(`${CERT_DIR}/server.cert`),
  allowHTTP1: true
};

const server = http2.createSecureServer(options, app)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.disable('x-powered-by')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewareConfig.limiter);
app.use(middlewareConfig.helmeted);
app.use(middlewareConfig.corsConfig);
app.use(middlewareConfig.httpLogger);

app.use('/api', router);

app.use(async (req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use(async (err: Error, req: Request, res: Response) => {
  logger.info(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

server.listen(PORT, () => {
  logger.info(`Server is starting: https://localhost:${PORT}`);
});

export default app;