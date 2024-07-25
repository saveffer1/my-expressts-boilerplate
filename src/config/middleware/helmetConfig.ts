import helmet from "helmet";

const helmeted = helmet({
   /**
    * Configured Helmet middleware to enhance the security of your Express application by setting various HTTP headers.
    *
    * @constant
    * @type {Function}
    *
    * @property {Object} contentSecurityPolicy - Sets up the Content Security Policy (CSP) directives.
    * @property {Object} contentSecurityPolicy.directives - Specific CSP directives.
    * @property {Array<string>} contentSecurityPolicy.directives.defaultSrc - Specifies valid sources for the default content.
    * @property {Array<string>|null} contentSecurityPolicy.directives.styleSrc - Specifies valid sources for stylesheets. Set to null to disable.
    * @property {Array<string>} contentSecurityPolicy.directives.scriptSrc - Specifies valid sources for scripts.
    * @property {Array<string>} contentSecurityPolicy.directives.objectSrc - Specifies valid sources for plugins like Flash.
    * @property {Array<any>} contentSecurityPolicy.directives.upgradeInsecureRequests - Enables the upgrade-insecure-requests directive.
    *
    * @property {boolean} crossOriginOpenerPolicy - Enables the Cross-Origin-Opener-Policy header to help mitigate side-channel attacks and information leakage.
    * @property {boolean} crossOriginResourcePolicy - Enables the Cross-Origin-Resource-Policy header to specify who can access the resources.
    *
    * @property {Object} referrerPolicy - Sets the Referrer-Policy header to control the amount of referrer information sent with requests.
    * @property {string} referrerPolicy.policy - The referrer policy to use. In this case, 'no-referrer' ensures that no referrer information is sent.
    *
    * @property {Object} strictTransportSecurity - Sets the Strict-Transport-Security header to enforce secure (HTTPS) connections to the server.
    * @property {number} strictTransportSecurity.maxAge - Specifies the max age (in seconds) to keep the site accessible only via HTTPS.
    * @property {boolean} strictTransportSecurity.includeSubDomains - Applies this policy to all subdomains as well.
    *
    * @property {Object} xDnsPrefetchControl - Controls DNS prefetching to improve user privacy.
    * @property {boolean} xDnsPrefetchControl.allow - Whether to allow DNS prefetching. Set to false to disallow.
    *
    * @property {boolean} xPoweredBy - Disables the X-Powered-By header to make it harder for attackers to see what technology powers the website.
    *
    * @property {boolean} xXssProtection - Enables the X-XSS-Protection header to help prevent reflected XSS attacks.
    *
    * @see {@link https://github.com/helmetjs/helmet}
    * 
    */
    contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: null,
          scriptSrc: ["'self'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
    },
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: true,
    referrerPolicy: { policy: 'no-referrer' },
    strictTransportSecurity: { maxAge: 15552000, includeSubDomains: true },
    xDnsPrefetchControl: { allow: false },
    xPoweredBy: false,
    xXssProtection: true,
});

export default helmeted;