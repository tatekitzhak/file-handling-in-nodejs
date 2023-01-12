var mongoose = require('mongoose')

// https://dev.to/sw360cab/mongoose-debug-messages-with-a-custom-logging-library-or-style-1hk4

// print mongoose logs in dev env
/* 
if (config.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
  }
 */
module.exports = {
  // Set the debug option: all executed methods log output to console
  async mongoose_debug(req, res, next) {
    // Option 1:
    mongoose.set('debug', true);
    // mongoose.set('debug',config.env === 'development');

    // Option 2:
    /* 
    await mongoose.set("debug", (collectionName, method, query, doc) => {
      console.log(`**##${collectionName}.${method}`, JSON.stringify(query), doc);
      // OR:
      // logger(`${collectionName}.${method}`, JSON.stringify(query), doc);
      
    });
 */
    next()
  }
}