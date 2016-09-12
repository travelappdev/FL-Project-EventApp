'use strict';

const express      = require('express');
const app          = express();
const port         = +process.env.PORT || 8000;
const path         = require('path');
const mongoose     = require('mongoose');
const morgan       = require('morgan');
const bodyParser   = require('body-parser'); // parsing middleware
const http         = require('http');




// connect to our database
//mongoose.connect('mongodb://localhost:27017/appdb');


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

  .get('/event/:name', function(req, res) {
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
  })


// ??? should be 404 error
  .on( 'error', function( error ){
     console.log( "Error: \n" + error.message );
     console.log( error.stack );
   });


//   .get('*', function(req, res) {
//   res.sendFile(path.join(__dirname + "/public/index.html"));
// });





//API router

var apiRouter = express.Router();


// EVENTS ROUTE

apiRouter.route('/events')

.post(function(req, res) {
  // create a new instance of the Event model
  var event = new Event();

  event.name = req.body.name;
  event.place = req.body.place;
  event.date = req.body.date;
  event.time = req.body.time;
  event.type = req.body.type;
  event.payment = req.body.payment;
  event.description = req.body.description;


  // save the user and check for errors
  event.save(function(err) {
    if (err) {
     // duplicate entry
     if (err.code == 11000)
       return res.json({ success: false, message: 'A user with that username already exists. '});
     else
       return res.send(err);
     }
     res.json({ message: 'Event created!' });
  });
})

.get(function(req, res) {

  Event
    .find({})
    .exec(function(err,events) {
      if(err) res.send(err);
      res.json(events);
    });
});


// GET TOP EVENTS

apiRouter.route('/topevents')
  .get(function(req, res) {

    Event
      .find({})
      .limit(20)
      //.sort({ occupation: -1 }) -- should be fixed
      .exec(function(err, events) {
        if(err) res.send(err);
        res.json(events);
      })
  });




// Get single event by id

apiRouter.route('/events/:event_id')

  .get(function(req, res) {
    Event.findById(req.params.event_id, function(err, event) {
      if (err) res.send(err);
      // return that user
      res.json(event);
    });
  })


  // method is used to update an event
  .put(function(req, res) {
    Event.findOneAndUpdate({
      'name': req.params.name
    }, {$set: {name: req.body.description} },
       {upsert: true}, // creates field if not exists

       function(err, event) {
         if(err) res.send(err)
         res.json({message: 'Event updated!'});
       });
  })


  .delete(function(req, res) {
    Event.findOneAndRemove({
      'name': req.params.name
    }, function(err, event) {
      if(err) res.send(err);
      res.json({message: 'Event deleted!'});
    });
  });





// USERS ROUTE

apiRouter.route('/users')

  .post(function(req, res) {
    // create a new instance of the User model
    var user = new User();
    // set the users information (comes from the request)
    user.email = req.body.email;
    user.password = req.body.password;
    user.username = req.body.username;



    // save the user and check for errors
    user.save(function(err) {
      if (err) {
       // duplicate entry
       if (err.code == 11000)
         return res.json({ success: false, message: 'A user with that username already exists. '});
       else
         return res.send(err);
       }
       res.json({ message: 'User created!' });
    });
  })

  .get(function(req, res) {
    // res.sendFile(path.join(`${__dirname}/db/randomUsers.json`))
    User.find(function(err, users) {
      if(err) res.send(err);
      res.json(users);
    });
  });



//SHOULD BE FIXED


apiRouter.route('/users/:email/:password') // body parser is responsible for theese parameters
  .get(function(req, res) {

    User.findOne({

      'email': req.params.email,
      'password': req.params.password

    }, function (err, user) {
      if (err) res.send(err);
      // return that user
      res.json(user);
    });
  });


// Should be applied

  apiRouter.route('/users/:user_id')
    .get(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);
        // return that user
        res.json(user);
      });
    });




// test route to make sure everything is working
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
