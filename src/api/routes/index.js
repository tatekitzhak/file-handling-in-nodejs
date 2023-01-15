'use strict'; // eslint-disable-line strict
const express = require('express');
const { buildDatabase } = require('../controllers/buildDatabase');
const { readFilesFromAWSS3 } = require('../controllers/aws');
const { readWriteFiles } = require('../controllers/readWriteFiles');
/* 
const { HttpError } = require( '../system/helpers/HttpError' );
const apiRoutes = require( '../system/routes' );
 */


const Router = express.Router();

function middleware(req, res, next) {
    console.log(`middleware from baseUrl: ${req.url}`);
        next();
}

Router.route('/aws')
    .get(middleware,
        readFilesFromAWSS3
    ).post();

Router.route('/build-database')
    .get(middleware,
    buildDatabase
    ).post();

Router.route('/process-files')
    .get(middleware,
        readWriteFiles
    ).post();

module.exports = {
    Router
};