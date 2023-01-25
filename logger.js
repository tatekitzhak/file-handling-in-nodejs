var path = require( "path" );
require('dotenv').config({ path: `.env` });
const  {env} = require(__dirname + '/src/configs/env');
const { logger } = require(__dirname + '/src/utils/logger/index');

logger().info(process.env.NODE_ENV);
logger().warn('warn text');
logger().error('error text');
logger().error(new Error('Something went wrong!'))

const express = require('express');

const app = express();

const PORT = env.NODE_PORT;


app.get('/', (req, res) => {
    res.send('Node.js is working!!');
});

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});