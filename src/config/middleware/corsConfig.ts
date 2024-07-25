import cors from 'cors';

const corsConfig = cors({
 /**
  * Configured CORS middleware to enable Cross-Origin Resource Sharing (CORS) for your Express application.
  *
  * @constant
  * @type {Function}
  *
  * @property {string} origin - Configures the Access-Control-Allow-Origin CORS header. Set to '*' to allow requests from any origin.
  * @property {Array<string>} methods - Specifies the HTTP methods that are allowed when accessing the resource.
  * @property {boolean} preflightContinue - Passes the CORS preflight response to the next handler. Set to false to terminate preflight with a response.
  * @property {Array<string>} allowedHeaders - Specifies the headers that can be used in the actual request.
  *
  * @see {@link https://github.com/expressjs/cors}
  *
  */
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  preflightContinue: false,
  allowedHeaders: ['*'],
});

export default corsConfig;