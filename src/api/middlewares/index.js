const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
	helmet = require('helmet'),
	logger = require('morgan');

const registerMiddlewareServices = express();

const { env } = require('../../configs/env');
console.log(env.NODE_ENV)
/**
 * Init Express middlewares
 */
registerMiddlewareServices.use(helmet()); // For security 
registerMiddlewareServices.use(logger('combined'))

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


module.exports = registerMiddlewareServices ;