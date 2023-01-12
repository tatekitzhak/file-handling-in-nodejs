'use strict'; // eslint-disable-line strict
const express = require('express');
const { buildDatabase } = require('../controllers/buildDatabase');
const { readFilesFromAWSS3 } = require('../controllers/aws');
const { readWriteFiles } = require('../controllers/readWriteFiles');
/* 
const { HttpError } = require( '../system/helpers/HttpError' );
const apiRoutes = require( '../system/routes' );
 */


/* 
const ReadWriteFilesRouter = express.Router();
const ReadWriteToAWSS3BucketsRouter = express.Router();


ReadWriteToAWSS3BucketsRouter.route('/')
    .get(function (req, res, next) {
        console.log(`middleware from baseUrl: ${req.baseUrl}`)
        next()
    },
        readFilesFromAWSS3
    ).post();

ReadWriteFilesRouter.route('/')
    .get((req, res, next) => {
        console.log('baseUrl: ', req.baseUrl)
        next()
    },
        readWriteFiles
    ).post();

module.exports = {
    ReadWriteFilesRouter,
    ReadWriteToAWSS3BucketsRouter
};
 */

// Read and Write to S3 Buckets
const Router = express.Router();
const ReadWriteToAWSS3BucketsRouter = express.Router();


Router.route('/aws')
    .get(function (req, res, next) {
        console.log(`middleware from baseUrl: ${req.url}`)
        next()
    },
        readFilesFromAWSS3
    ).post();

Router.route('/build-database')
    .get(function (req, res, next) {
        console.log(`middleware from baseUrl: ${req.url}`)
        next()
    },
    buildDatabase
    ).post();

Router.route('/process-files')
    .get((req, res, next) => {
        console.log('baseUrl: ', req.url)
        next()
    },
        readWriteFiles
    ).post();

module.exports = {
    Router
};