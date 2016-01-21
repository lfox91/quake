var states = require('./statenames.js');
var Datamap = require('datamaps')
var bubbles = [];


// /////////////////////////////////////////////
// USGS GET: 2.5 day data stream
// TODO: Refactor api to server to control
// user experience and data flow.
// /////////////////////////////////////////////

//Quake 2.5 day api data
var quakeTwoDayAPI = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";
  $.getJSON( QuakeTwoDayAPI, {
    tags: "Earthquakes within the last 2.5 days",
    tagmode: "any",
    format: "json"
  })

var data = d3.json(quakeTwoDayAPI, drawBubbles)

//Generate an Instance of Datamap
var map = new Datamap({ element: document.getElementById('map'),
                        scope: "usa" ,
                        done: function(datamap) {
                            datamap.svg.selectAll('.datamaps-subunit').on('click',
                            function(geography) {
                                console.log(geography)
                                zoomin(geography);
                            });
                        }
                    });
// document.setTimeout(map.bubbles(bubbles), 5000)


function drawBubbles(quakeTwoDayAPI){
    // /////////////////////////////////////////////
    // DRAW QUAKE UI:
    // TODO: Refactor into server to control user
    // experience and data flow.
    // /////////////////////////////////////////////
    for(var i = 0; i < quakeTwoDayAPI.features.length; i++){
        // console.log(data.features[i], "DJA")
        var name = quakeTwoDayAPI.features[i].properties.title;
        var placeName = name.slice(name.lastIndexOf(',')+2);

        if(states.indexOf(placeName)>-1){
            bubbles.push({
                "place": name,
                "latitude": quakeTwoDayAPI.features[i].geometry.coordinates[1],
                "longitude": quakeTwoDayAPI.features[i].geometry.coordinates[0],
                "radius": quakeTwoDayAPI.features[i].properties.mag*4
            });
        }
    }
     //console.log('Map bubbles:    ', bubbles)
    map.bubbles(bubbles, {
        popupTemplate: function(geo, quakeTwoDayAPI) {
            return "<div class='hoverinfo'>Earthquake for " + quakeTwoDayAPI.place + "";
        }
    })
}
