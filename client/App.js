/* jshint esnext:true*/
import React from 'react';
import {render} from 'react-dom'

class App extends React.Component{
  constructor(){
    super();
    state = {
      textStream:[],
      mapStream: []
    };
  }
  render(){
    return(
      <App>
        <Head/>
        <Map/>
        <Foot/>
      <App/>
    )
  }
}
render('App', document.getElementById('container'));
export default App;
