const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	helmet = require('helmet'),
	logger = require('morgan');
const { env } = require('../../configs/env');

const registerMiddlewareServices = express();

/**
 * Init Express middlewares
 */
registerMiddlewareServices.use(helmet()); // For security 
registerMiddlewareServices.use(logger('combined'))

// Allow Origins according to your need.
const corsOptions = {
	'origin': '*'
};

if (env.nodeEnv.DEV === 'development') {
	registerMiddlewareServices.use(cors(corsOptions));
} else {
	registerMiddlewareServices.use(cors({ origin: ['http://localhost:4200'] }));
}

const services = {
	requireAuthentication: function (req, res, next) {
		console.log('private requireAuthenticationrequest:');
		next();
	},
	logger: function (req, res, next) {
		console.log('logger request hit:');
		next();
	}
}
const parser = {
	bodyParserUrlencoded: bodyParser.urlencoded({ extended: true }), // to accept POST requests <form> tag which has a body urlencoded 
	bodyParserJson: bodyParser.json(), // to accept POST requests, send the body in JSON format (Ajax and axios)
	bodyParserRaw: bodyParser.raw()
}


module.exports = {
	parser,
	registerMiddlewareServices,
	services
};