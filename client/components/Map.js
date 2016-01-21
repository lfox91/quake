import React from 'react';
import states from '../js/statenames';
import Datamap from 'datamaps';
// import SVG from '../js/svg';
// import StyleSheet from 'react-style';

export default class Map extends React.Component{
  constructor(){
    super();
    this.state = {
      textStream:[],
      mapStream: []
    };

  }
  leBubbles() {
    var map = new Datamap({ element: document.getElementById('map'),
                            scope: "usa",
                            fills: {'main':'#604f16', defaultFill:'#448135'}});
    const earl =
    'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson';
    d3.json(earl, drawBubbles);

    function drawBubbles(err, data){
      var bubbles = [];
      if(err)return err;
      for(var i = 0; i < data.features.length; i++){
          var name = data.features[i].properties.title;
          var placeName = name.slice(name.lastIndexOf(',')+2);
          if(states.indexOf(placeName)>-1){
              console.log(placeName);
              bubbles.push({
                  place: name,
                  latitude: data.features[i].geometry.coordinates[1],
                  longitude: data.features[i].geometry.coordinates[0],
                  radius: data.features[i].properties.mag*4,
                  fillKey: 'main'
              });
          }
      }
      map.bubbles(bubbles, {
          popupTemplate: function(geo, data) {
            return "<div class='hoverinfo'>Earthquake for " + data.place + "";
          },
      });
    }
  }
  componentDidMount() {
    this.leBubbles();
  }
  render(){
    return(
      <div id='map'style={{position: 'relative', width: 1000, height: 800}}>

      </div>
    );
  }
}
