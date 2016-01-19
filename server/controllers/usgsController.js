var express = require('express');
var bodyParser = require('body-parser')
var request = require('request');

var app = express();


var usgsController = {
  // getData: function(req, res, next) {
  //   request('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02', function(error, response, html) {
  //     return res.send(output);
  //     console.log(req.body);
  //   });

  //Lets try to make a HTTPS GET request to modulus.io's website.
  //All we did here to make HTTPS call is changed the `http` to `https` in URL.

  getData: function(req, res, next) {

    // /////////////////////////////////////////////
    // get usgs data
    // /////////////////////////////////////////////
    request('http://earthquake.usgs.gov/fdsnws/event/1/application.json', function (error, response, body) {
        //Check for error
        // var d = new Date();
        // var n = d.getMinutes();

        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        console.log(res);
        //console.log(n);
        res.send(response);

    });//end request

 }//end getData method

}//usgsController obj

module.exports = usgsController;
