const http = require("http");
const { env } = require('./configs/env');
const { registerMiddlewareServices } = require( './api/middlewares/index' );

require('./api/index')(registerMiddlewareServices, 'Startup'); 

// import { RedisService } from './services/redis';

// Startup
(async function main(args) {
	try {
		// Connect db:
		/* 
		logger.info('Initializing ORM connection...');
		const connection = await createConnection();
 */
		// Connect redis:
		// RedisService.connect();

		// Init express server app
		// const server = http.createServer(expressApp);

		// Start express server
		registerMiddlewareServices.listen(env.NODE_PORT,env.HOST, () => {
			console.log(`server started on: \x1b[36m http://localhost:${env.NODE_PORT} \x1b[0m`)
			// process.exit(1234)
		});

		registerMiddlewareServices.on('listening', () => {
			// logger.info(`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
			console.log(`node server is listening on: http://${env.HOST}:${env.NODE_PORT}`)
			// server.close(9999)
			// process.exit(1234)
		});

		process.on('exit', code => {
			// Only synchronous calls
			console.log(`Process exited with code: ${code}`)
		  })
		
		  registerMiddlewareServices.on('close', (args) => {
			// connection.close();
			// RedisService.disconnect();
			// logger.info('node server closed');
			console.log('Node Server closed:',args)
		});
		
	} catch (error) {
		// logger.error(err.stack);
		console.log('error:\n',error)
	}
	finally {
		console.log('finally: ',args)
	}
})([{},{}]);