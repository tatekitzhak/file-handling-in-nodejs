// https://stackoverflow.com/questions/37486631/nodemon-app-crashed-waiting-for-file-changes-before-starting
module.exports = function(args) {
    // Load grunt tasks automatically
    require('load-tasks')(args);

    var options = {
        paths: {
            app: 'app',
            assets: 'app/assets',
            dist: 'app/dist',
            distAssets: 'app/dist/assets',
            html: 'app/html',
            htmlTmp: '.tmp/htmlsnapshot',
            htmlAssets: 'app/html/assets',
            index: 'app/dist/index.html',
            indexDev: 'app/index.html',
            indexTmp: '.tmp/html/index.html'
        },
        pkg: pkg,
        env: {
            test: {
                NODE_ENV: 'test'
            },
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            }
        }
    };

    // Load configurations automatically
    var configs = require('load-configs')(args, options);

    // Define the configuration for all the tasks
    args.initConfig(configs);

    // Connect to the MongoDB instance and load the models
    args.task.registerTask('mongoose', 'Task that connects to the MongoDB instance and loads the application models.', function () {
        // Get the callback
        var done = this.async();

        // Use mongoose configuration
        var mongoose = require('./config/lib/mongoose.js');

        // Connect to database
        mongoose.connect(function (db) {
            done();
        });
    });
};