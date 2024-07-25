import { Request, Response, RequestHandler } from 'express';
import compression from 'compression';

/** This function is deprecated and will be removed in the next major version.
 *  Please use other compression middleware instead.
 *
 *  @remarks not compatible with node-http2
 *  @see {@link https://github.com/expressjs/compression/issues/122}
 */
function shouldCompress(req: Request, res: Response) {
 /**
  * Filter compression with x-no-compression header
  *
  * @param Request - The expressjs request
  * @param Response - The expressjs response
  * @returns true if have x-no-compression header else false
  *
  * @see {@link https://github.com/expressjs/compression}
  */
  if (req.headers['x-no-compression']) {
    return false;
  }
     
  return compression.filter(req, res);
}

const compress: RequestHandler = compression({ filter: shouldCompress });

export default compress;
