var express = require('express');
var bodyParser = require('body-parser')


var usgsController = {
  // getData: function(req, res, next) {
  //   request('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02', function(error, response, html) {
  //     return res.send(output);
  //     console.log(req.body);
  //   });

  request('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage.
    }
  })

};

module.exports = usgsController;
