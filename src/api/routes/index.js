'use strict'; // eslint-disable-line strict
const express = require('express');
const { readFilesFromAWSS3 } = require('../controllers/aws')
/* 
const path = require( 'path' );
const { HttpError } = require( '../system/helpers/HttpError' );
const apiRoutes = require( '../system/routes' );
 */


// Read and Write to S3 Buckets
const ProcessFilesRouter = express.Router();
const ReadWriteToAWSS3BucketsRouter = express.Router();


ReadWriteToAWSS3BucketsRouter.route('/')
    .get(function (req, res, next) {
        console.log(`middleware from baseUrl: ${req.baseUrl}`)
        next()
    },
        readFilesFromAWSS3)
    .post();

ProcessFilesRouter.route('/')
    .get((req, res) => {
        console.log('baseUrl: ', req.baseUrl)
        res.send(`Welcome to the ${req.baseUrl}`);
    })
    .post();

module.exports = {
    ProcessFilesRouter,
    ReadWriteToAWSS3BucketsRouter
};