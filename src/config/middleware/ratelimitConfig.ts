import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
   /**
	* Configured rate limiter middleware to limit repeated requests to public APIs and/or endpoints in your Express application.
	*
	* @constant
	* @type {Function}
	*
	* @property {number} windowMs - The time window for which requests are checked/remembered, in milliseconds. (e.g., 60 * 1000 = 1 minute)
	* @property {number} limit - The maximum number of requests that are allowed within the `windowMs` time window.
	* @property {string} standardHeaders - Enables the sending of rate limit information in the `RateLimit-*` headers according to the specified draft standard.
	* @property {boolean} legacyHeaders - Disables the `X-RateLimit-*` headers.
	* @property {string} message - The response message to send when a client has exceeded the rate limit.
	*
	* @see {@link https://github.com/express-rate-limit/express-rate-limit}
	*
	*/
	windowMs: 60 * 1000,
	limit: 20,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
	message: 'Too many requests, please try again later.',
});

export default limiter;