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
    console.log(SVG);
    // document.getElementsByTagName('circle').className+=" pulse infinite";
    d3.selectAll("g").classed("animated pulse infinite", true)
//     var width = 1000,
//         height = 800;
//     var projection = d3.geo.mercator()
//         .center([113, -3])
//         .scale(1275)
//         .translate([width / 2, height / 2])
//         .clipExtent([[0, 0], [width, height]])
//         .precision(0.1);
// setInterval(function() {
//   d3.select(".datamap").append("circle")
//       .attr("class", "datamap-bubble")
//       .attr("transform", "translate(" + projection([100, -8]) + ")")
//       .attr("r", 6)
//       .style("stroke-width", 3)
//       .style("stroke", "white")
//     .transition()
//       .ease("linear")
//       .duration(6000)
//       .style("stroke-opacity", 1e-6)
//       .style("stroke-width", 1)
//       .style("stroke", "red")
//       .attr("r", 20)
//       .remove();
// }, 750).bind(this);
  }
  render(){
    return(
      <div id='map'style={{position: 'relative', width: 1000, height: 800}}>

      </div>
    );
  }
}
