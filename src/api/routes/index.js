'use strict';
const express = require('express');
/* 
const path = require( 'path' );
const { HttpError } = require( '../system/helpers/HttpError' );
const apiRoutes = require( '../system/routes' );
 */
const myRouter = express.Router();
myRouter.get('/', (req, res, next) => {
    res.json({ page: 'Home pag!' })
  
  });

myRouter.route('/aws')
    .get(function (req, res, next) {
        console.log(req.path,'middleware:')
        next()
    },
        (req, res) => {
            res.send('Welcome to the /aws');
        })
    .post();

myRouter.route('/process-siles')
    .get((req, res) => {
        console.log(req.path,':')
        res.send(`Welcome to the ${req.path}`);
    })
    .post();

module.exports = { myRouter };