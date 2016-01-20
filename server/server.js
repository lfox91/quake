// /////////////////////////////////////////////
// SET UP EXPRESS ENVIRONMENT:
// /////////////////////////////////////////////
var express = require('express');
var app = express();

// /////////////////////////////////////////////
// NPM DEPENDANCIES: production
// /////////////////////////////////////////////
var bodyParser = require('body-parser');
var request = require('request');
var apicache = require('apicache').options({ debug: true }).middleware;
var path = require('path');

// /////////////////////////////////////////////
// CUSTOM MIDDLEWARE:
// /////////////////////////////////////////////
var usgsController = require('./controllers/usgsController.js');

// /////////////////////////////////////////////
// GLOBAL APP DEPENDANCIES
// /////////////////////////////////////////////

  // /////////////////////////////////////////////
  // Parse incoming data. Limit parameter added
  // due to the large object from the usgs api.
  // /////////////////////////////////////////////
  app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
  app.use(bodyParser.json({limit: '10mb'}));
  // /////////////////////////////////////////////
  //Static route was originally as follows, but since you need to go up a directory
  // you need to type that in, instead of just client, since client here would be
  // server/client
  // /////////////////////////////////////////////
  //app.use(express.static(path.join(__dirname, 'client')));

  app.use(express.static(path.join(__dirname, './../client')));

// /////////////////////////////////////////////
// ROUTES:
// /////////////////////////////////////////////

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '../client', 'index.html'));
// });


// /////////////////////////////////////////////
// APICHE: cache and set req time for USGS Api
// /////////////////////////////////////////////

//  |-- STATUS: Working  USE: enable when ready to use real data --|
//  app.get('/', apicache('5 minutes'), usgsController.getData, function (req, res) {
//   res.send('Hello World!');
//  });


// /////////////////////////////////////////////
// POSTMAN: dev route to test usgs api's
// /////////////////////////////////////////////
app.post('/usgsData', function(req, res){
  console.log(JSON.stringify(req.body, null, '\t'));
  res.send(JSON.stringify(req.body, null, '\t'));
} );

// /////////////////////////////////////////////
// START SERVER
// /////////////////////////////////////////////
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


module.exports = app;
