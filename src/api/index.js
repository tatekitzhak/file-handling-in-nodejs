const express = require("express");
/* 
const shopRouter = require('./tiny_store/route');
const { apiRateNetworkTrafficLimiter } = require('../middlewares/rateLimiter');
const { mongoose_debug }  = require('../middlewares/enableDebugLoggingMongoose');
 */
/**
 * https://github.com/Automattic/mongoose/issues/4802
 */

module.exports = function () {
	const app = express();
/* 
    app.use(mongoose_debug)    
	app.use(express.json());
	 */
   return app.use('/aws', function(req, res, next){
		console.log('aws')

		res.status(200).json({mesage: 'aws'})
	});
};