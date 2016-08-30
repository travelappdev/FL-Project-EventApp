'use strict';

const express      = require('express');
const app          = express();
const port         = +process.env.PORT || 8000;
const path         = require('path');
const mongoose     = require('mongoose');
const morgan       = require('morgan');
const bodyParser   = require('body-parser');
const http         = require('http');




// connect to our database
mongoose.connect('mongodb://localhost:27017/travelApp_db');


let User = require('./db/userSchema');
let Event = require('./db/eventSchema');



// set the static files location /public/img will be /img for users
// app.use(express.static(__dirname + '/public'));


// directory with production files
app.use(express.static(__dirname + '/'));


app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json




// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});



// ROUTES TO OUR PAGES

app
  .get('/', function(req, res) {
    res.sendFile(path.join(`${__dirname}/public/index.html`));
  })

  .get('/about', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  })

  .get('/event', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  })

  .get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  })

  .get('/event_manage', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  })

  .get('/profile', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });








// API router

var apiRouter = express.Router();

apiRouter.route('/test')

  // accessed at GET http://localhost:8080/api/users)
  .get(function(req, res) {
    res.sendFile(path.join(`${__dirname}/public/js/data/test.json`));
  });

  // .post(function(req, res) {
  //
  // });



// test route to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res) {
  res.json({ message: 'Welcome to our api!' });
});


// register our routes
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);


// start the server


http
  .createServer(app).listen(port)
  .on('error', function(error){
     console.log("Error: \n" + error.message);
     console.log(error.stack);
  });

console.log(`Server is running on port ${port}`);



// // as server.js
// var http = require('http');
// var express = require('express');
// var app = express();
//
// app
//     .use(express.static('public'))
//     .get('/home/login', function (req, res) {
//         console.log('Login request');
//         res.status(200).send('Login from server.');
//     })
//     .all('/*', function ( req, res ) {
//         console.log('All');
//         res
//             .status( 200 )
//             .set( { 'content-type': 'text/html; charset=utf-8' } )
//             .sendfile('public/index.html' );
//     })
//     .on( 'error', function( error ){
//        console.log( "Error: \n" + error.message );
//        console.log( error.stack );
//     });
//
