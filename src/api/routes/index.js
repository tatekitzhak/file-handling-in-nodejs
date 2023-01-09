'use strict'; // eslint-disable-line strict
const express = require('express');
const { readFilesFromAWSS3 } = require('../controllers/aws');
const { readWriteFiles } = require('../controllers/readWriteFiles');
/* 
const path = require( 'path' );
const { HttpError } = require( '../system/helpers/HttpError' );
const apiRoutes = require( '../system/routes' );
 */


// Read and Write to S3 Buckets
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