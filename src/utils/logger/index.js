const buildDevLogger = require('./dev-logger'),
    buildProdLogger = require('./prod-logger'),
    buildStageLogger = require('./stage-logger');

module.exports = {
    
    logger: function (params) {
        switch (process.env.NODE_ENV) {
            case 'development':
                return buildDevLogger()
                break;
            case 'production':
                return buildProdLogger()
                break;
            case 'stage':
                return buildStageLogger()
                break;
            default:
                break;
        }
    },
};