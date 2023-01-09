const { ReadWriteFilesRouter, ReadWriteToAWSS3BucketsRouter } = require('./routes/index');
const { services } = require('./middlewares/index');
var inspect = require('util').inspect;
/* 
const shopRouter = require('./tiny_store/route');
const { apiRateNetworkTrafficLimiter } = require('../middlewares/rateLimiter');
const { mongoose_debug }  = require('../middlewares/enableDebugLoggingMongoose');
 */
/**
 * https://github.com/Automattic/mongoose/issues/4802
 */

module.exports = function (app, args) {
	console.log(args)
	/* 
		app.use(mongoose_debug)    
		app.use(express.json());
	*/

	/**
     * API Route.
     * All the API will start with "/api/[MODULE_ROUTE]"
     */

	app.get('/', (req, res, next) => {
		res.json({ page: 'Home pag!' })
	
	});

	app.use('/aws', ReadWriteToAWSS3BucketsRouter);

	app.use('/process-files', [ services.requireAuthentication, services.logger ], ReadWriteFilesRouter);

	 /**
     * If No route matches. Send user a 404 page
     */
	app.use('/*', (req, res, next) => {
		console.log('Error handler:\n',);
		const err = new Error(404, 'fail', 'undefined route\n');
		next(err, req, res, next);
	});

	/* Error handler middleware */
	app.use((err, req, res, next) => {
		console.log('Error handler:\n', err.message, 'err.stack:\n', err.stack);
		err.statusCode = err.statusCode || 500;

		res.status(err.statusCode).json({
			status: err.statusCode,
			error: err,
			message: err.message,
			stack: err.stack
		});
	});
};