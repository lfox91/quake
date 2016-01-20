var express = require('express');
var bodyParser = require('body-parser')
var request = require('request');

var app = express();


var usgsController = {

  // /////////////////////////////////////////////
  // GETDATA METHOD:  runs request for usgs data
  // for the last 24hours.
  //
  // NOTICE: This api is updated every 5 minutes.
  // ApiCache middleware handles the both caching
  // and intervals.
  // /////////////////////////////////////////////

  getData: function(req, res, next) {
            request('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02', function (error, response, body) {
                if(error){
                    return console.log('Error:', error);
                }
                if(response.statusCode !== 200){
                    return console.log('Invalid Status Code Returned:', response.statusCode);
                }
                res.send(response);

            });//end request

           }//end getData method

}//usgsController obj

module.exports = usgsController;
