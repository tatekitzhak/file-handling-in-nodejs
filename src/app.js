const http = require("http");

const express = require('express');

// import { createServer, Server as HttpServer } from 'http';

const host = 'localhost';
const port = 8000;

const { registerMiddlewareServices } = require( './api/middlewares/index' );
const app = require('./api/index')(registerMiddlewareServices); 

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
		const server = http.createServer(app); // const server: HttpServer = createServer(app);

		// Start express server
		server.listen(port,host);

		server.on('listening', () => {
			// logger.info(`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
			console.log(`node server is listening on port ${port}`)
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
			console.log('Node Server closed:',args)
		});
		
	} catch (error) {
		// logger.error(err.stack);
		console.log('error:\n',error)
	}
	finally {
		console.log('finally:\n',args)
	}
})([{},{}]);