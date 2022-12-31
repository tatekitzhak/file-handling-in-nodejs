const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    helmet = require('helmet');

const registerMiddlewareServices = express();


// import { env } from '../../config/globals';

/**
 * Init Express middlewares
 */


registerMiddlewareServices.use(helmet()); // For security 
// Allow Origins according to your need.
const corsOptions = {
    'origin': '*'
};
/* 
	if (env.NODE_ENV === 'development') {
		router.use(cors({ origin: '*' }));
	} else {
		router.use(cors({ origin: ['http://localhost:4200'] }));
	}

 */	
registerMiddlewareServices.use(cors(corsOptions));

registerMiddlewareServices.use(bodyParser.json());

/**
 * Init Express error handler
/* 
export function registerErrorHandler(router: Router): Response | void {
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		UtilityService.handleError(err);

		return res.status(500).json({
			error: err.message || err,
			status: 500
		});
	});
}
 */
module.exports = { registerMiddlewareServices } ;