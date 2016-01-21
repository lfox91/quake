var request = require('request');
var bodyParser = require('body-parser');
var states = require('./statenames');

// /////////////////////////////////////////////
// USGS API's:
// twoDay: 2.5 day max feed from USGS
// /////////////////////////////////////////////



var usgsController = {

  //////////////////////////////////////////////
  // GETDATA METHOD:  runs request for usgs data
  // for the last 24hours.
  //
  // NOTICE: This api is updated every 5 minutes.
  // ApiCache middleware handles the both caching
  // and intervals.
  //
  // TODO: Refactor frontend bubbles/data filter
  // functions into an api.
  //
  // ROUTE       |   HTTP VERB   |   STATUS   | DESCRIPTION
  // /api/quakes    GET             INCOMPLETE   Get 2.5 day data stream
  //
  // /////////////////////////////////////////////



  // /////////////////////////////////////////////
  // get usgs data
  // /////////////////////////////////////////////
  getData: function(req, res, next) {
    //SUCCESSFULLY PASSES DATA.
    // console.log('GETDATA FIRED----------------->');
    // console.log(JSON.stringify(req.body, null, '\t'));

    const twoDayDataAPI = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';

    request(twoDayDataAPI , function (error, response, body) {
            if(error){
                return console.log('Error:', error);
            }
            //Check for right status code
            if(response.statusCode !== 200){
                return console.log('Invalid Status Code Returned:', response.statusCode);
            }
            //console.log('gotData from USGS');
            // console.log(body);
            //set the req body to body
            req.body = body;
            console.log('get finished');
            next();
            //res.send(response);
          });//end request

  },//end getData method

  findLocation:  function(req, res, next){
    var bubbles = [];
    console.log('finding USA locations');
    //PARSE THE DATA !!
    var quakeLocation = JSON.parse(req.body);
    // console.log(quakeLocation.features);

    for(var i = 0; i < quakeLocation.features.length; i++){
        // console.log(data.features[i], "DJA")
        var name = quakeLocation.features[i].properties.title;
        var placeName = name.slice(name.lastIndexOf(',')+2);
    //FILTER OUT ANYTHING NOT IN AMERICA
    //Add place name, lat, long, magnitude, time, and alert scale
        if(states.indexOf(placeName)>-1){
            bubbles.push({
                "alert": quakeLocation.features[i].properties.alert,
                "time": quakeLocation.features[i].properties.time,
                "place": name,
                "latitude": quakeLocation.features[i].geometry.coordinates[1],
                "longitude": quakeLocation.features[i].geometry.coordinates[0],
                //Radius is set by multiplying magnitude by 4, can adjust to scales later
                "radius": quakeLocation.features[i].properties.mag*4
            });
        }
    }
    //Stringify it in order to send
    res.send(JSON.stringify(bubbles))
  }


}//usgsController obj

module.exports = usgsController;
