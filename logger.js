require('dotenv').config({ path: `.env` });
const { env } = require('./src/configs/env');
const { logger } = require('./src/utils/logger/index');

logger().info(process.env.NODE_ENV);
logger().warn('warn text');
logger().error('error text');
logger().error(new Error('Something went wrong!'))


const express = require('express');

const app = express();

const PORT = env.NODE_PORT;


app.get('/', (req, res) => {
    res.send('Node.js is working!');
});

app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
});