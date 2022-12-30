const http = require("http");

const express = require('express');

// import { createServer, Server as HttpServer } from 'http';


const app = require('./api/index')(); // from './api/server';

// import { RedisService } from './services/redis';

// Startup
(async function main() {
	try {
		// Connect db:
		/* 
		logger.info('Initializing ORM connection...');
		const connection = await createConnection();
 */
		// Connect redis:
		// RedisService.connect();

		// Init express server app:
		// const app = new Server().app;
		const server = http.createServer(app); // const server: HttpServer = createServer(app);

		// Start express server

		const host = 'localhost';
		const port = 8000;
		server.listen(port,host);

		server.on('listening', () => {
			// logger.info(`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
			console.log(`node server is listening on port ${port}`)
		});

		server.on('close', () => {
			connection.close();
			RedisService.disconnect();
			logger.info('node server closed');
		});
	} catch (err) {
		logger.error(err.stack);
	}
	finally {
		console.log('finally:\n')
	}
})();