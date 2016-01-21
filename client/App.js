import React from 'react';
import {render} from 'react-dom';
import Map from './components/Map';
import Head from './components/Head';

class App extends React.Component{
  render(){
    return(
      <div>
        <Head/>
        <Map/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('container'));
