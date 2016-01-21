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
  // TODO: Review USGS API and optimize limit.
  // /////////////////////////////////////////////
  app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));
  app.use(bodyParser.json({limit: '10mb'}));
  app.use(express.static(path.join(__dirname, './../client')));

// /////////////////////////////////////////////
// ROUTES:
// /////////////////////////////////////////////

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// /////////////////////////////////////////////
// APICHE: cache and set req time for USGS api req
// STATUS: cache working, API in Progress
// TODO: Integrate into API
// /////////////////////////////////////////////

  //  app.get('/', apicache('5 minutes'), usgsController.getData,
  //          function (req, res) {
  //           res.send('Hello World!');
  //          });

 app.get('/', apicache('5 minutes'), usgsController.getData,
         function (req, res) {
          res.sendStatus(200);
         });
 app.get('/data',  usgsController.getData, usgsController.findLocation,
         function (req, res) {
          res.sendStatus(200);
         });
// /////////////////////////////////////////////
// POSTMAN: dev route to test usgs api's
// /////////////////////////////////////////////
app.post('/usgsData', usgsController.getData, usgsController.findLocation,  function(req, res, next){
  // console.log(JSON.stringify(req.body, null, '\t'));
  // res.send(JSON.stringify(req.body, null, '\t'));
  res.send('got it');
} );

// /////////////////////////////////////////////
// START SERVER:
// /////////////////////////////////////////////
app.listen(3000, function () {
  console.log('Quake App running on port 3000!');
});


module.exports = app;
