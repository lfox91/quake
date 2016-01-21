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
    //Request the JSON Data (already filtered) from our server
    const earl = '/data';
    d3.json(earl, drawBubbles);

    function drawBubbles(err, data){
        map.bubbles(data, {
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
