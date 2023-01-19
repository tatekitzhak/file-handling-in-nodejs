const { createLogger, format, transports } = require('winston');
const { combine, colorize, errors, timestamp, label, printf } = format;


  function buildDevLogger(params) {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} ${level}: ${stack || message}`;
    });

    return  createLogger({
      format: combine(
          colorize(),
          errors({ stack: true }),
          timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
          logFormat
      ),
      transports: [new transports.Console()],
    });
    
  }

  module.exports = buildDevLogger;