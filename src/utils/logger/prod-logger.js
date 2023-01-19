const { createLogger, format, transports } = require('winston');
const { combine, errors, json, timestamp } = format;


function buildProdLogger() {
    return createLogger({
        format: combine(
            errors({ stack: true }),
            json(),
            timestamp()
        ),
        defaultMeta: { service: 'user-service' },
        transports: [new transports.Console()],
      });       
}

module.exports = buildProdLogger;