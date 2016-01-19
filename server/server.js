// /////////////////////////////////////////////
// require express | standard
// /////////////////////////////////////////////
var express = require('express');
var app = express();

// /////////////////////////////////////////////
// NPM dependencies | production
// /////////////////////////////////////////////
var bodyParser = require('body-parser')
var request = require('request');
var apicache = require('apicache').options({ debug: true }).middleware;


// /////////////////////////////////////////////
// Custom middleware
// /////////////////////////////////////////////
var usgsController = require('./controllers/usgsController.js');

// /////////////////////////////////////////////
// Mount middleware
// /////////////////////////////////////////////
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
app.use(bodyParser.json({limit: '10mb'}));


// /////////////////////////////////////////////
// Routes
// /////////////////////////////////////////////

//** this works, but using .post from postman for testing**//
// app.get('/', apicache('5 minutes'), usgsController.getData, function (req, res) {
//
//    res.send('Hello World!');
// });

app.post('/usgsData', function(req, res){
  console.log(JSON.stringify(req.body, null, '\t'));
  res.send(JSON.stringify(req.body, null, '\t'));
} );



// /////////////////////////////////////////////
// get data from USGA
// /////////////////////////////////////////////



// /////////////////////////////////////////////
// Start server
// /////////////////////////////////////////////
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


module.exports = app;
