var states = require('./statenames.js');
var Datamap = require('datamaps')
var bubbles = [];


// /////////////////////////////////////////////
// USGS GET: 2.5 day data stream
// TODO: Refactor api to server to control
// user experience and data flow.
// /////////////////////////////////////////////
var data = d3.json('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson', drawBubbles)
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


function drawBubbles(data){
    // /////////////////////////////////////////////
    // DRAW QUAKE UI:
    // TODO: Refactor into server to control user
    // experience and data flow.
    // /////////////////////////////////////////////
    for(var i = 0; i < data.features.length; i++){
        // console.log(data.features[i], "DJA")
        var name = data.features[i].properties.title;
        var placeName = name.slice(name.lastIndexOf(',')+2);

        if(states.indexOf(placeName)>-1){
            bubbles.push({
                "place": name,
                "latitude": data.features[i].geometry.coordinates[1],
                "longitude": data.features[i].geometry.coordinates[0],
                "radius": data.features[i].properties.mag*4
            });
        }
    }
    // console.log(bubbles)
    map.bubbles(bubbles, {
        popupTemplate: function(geo, data) {
            return "<div class='hoverinfo'>Earthquake for " + data.place + "";
        }
    })
}
