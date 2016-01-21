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
            console.log(body);
            console.log('get finished');
            next();
            //res.send(response);
          });//end request

  },//end getData method

  findLocation:  function(req, res, next){
    var bubbles = [];
    console.log('finding USA locations');
    var quakeLocation = req.body;
    console.log(quakeLocation);

    // for(var i = 0; i < quakeLocation.features.length; i++){
    //     // console.log(data.features[i], "DJA")
    //     var name = quakeLocation.features[i].properties.title;
    //     var placeName = name.slice(name.lastIndexOf(',')+2);
    //
    //     if(states.indexOf(placeName)>-1){
    //         bubbles.push({
    //             "place": name,
    //             "latitude": quakeLocation.features[i].geometry.coordinates[1],
    //             "longitude": quakeLocation.features[i].geometry.coordinates[0],
    //             "radius": quakeLocation.features[i].properties.mag*4
    //         });
    //     }
    // }
    //  console.log('Map bubbles:    ', bubbles)
    // map.bubbles(bubbles, {
    //     popupTemplate: function(geo, quakeLocation) {
    //         return "<div class='hoverinfo'>Earthquake for " + quakeLocation.place + "";
    //     }
    // })

  }


}//usgsController obj

module.exports = usgsController;
