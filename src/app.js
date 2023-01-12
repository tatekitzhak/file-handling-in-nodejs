'use strict'; // eslint-disable-line strict
const http = require("http");
const { mongooseConnection } = require('./configs/connection');
const Database = require( './configs/database' );
const { env } = require('./configs/env');
const { registerMiddlewareServices } = require('./api/middlewares/index');

require('./api/index')(registerMiddlewareServices, 'Startup');

const PORT = env.NODE_PORT,
	HOST = env.HOST;
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
		const server = http.createServer(registerMiddlewareServices);

		// Start express server
		server.listen(PORT, HOST);
		server.on('listening', () => {
			new Database('app.js')
			console.log(`node server is listening on: \x1b[36m http://${env.HOST}:${env.NODE_PORT}\x1b[0m`);
			// logger.info(`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
			// server.close(9999)
			// process.exit(1234)
		});
		process.on('exit', code => {
			// Only synchronous calls
			console.log(`Process exited with code: ${code}`)
		})
		server.on('close', (args) => {
			// connection.close();
			// RedisService.disconnect();
			// logger.info('node server closed');
			console.log('Node Server closed:', args)
		});

	} catch (error) {
		// logger.error(err.stack);
		console.log('error:\n', error)
	}
	finally {
		console.log('finally: ', args)
	}
})([{}, {}]);