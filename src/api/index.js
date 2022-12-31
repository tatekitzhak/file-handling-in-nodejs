const express = require("express");
/* 
const shopRouter = require('./tiny_store/route');
const { apiRateNetworkTrafficLimiter } = require('../middlewares/rateLimiter');
const { mongoose_debug }  = require('../middlewares/enableDebugLoggingMongoose');
 */
/**
 * https://github.com/Automattic/mongoose/issues/4802
 */

const { myRouter } = require('./routes/index')
module.exports = function (app) {
	// const app = express();
/* 
    app.use(mongoose_debug)    
	app.use(express.json());
	 */
   return app.use(myRouter);
};