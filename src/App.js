/* eslint-disable */
import React, {Component} from 'react';

import Sources from './sources'
import DrawCanvas from './Rendu'


// const image = initial.image;
// const cadrage = presets[initial.preset];
// const cadre = {width: 200, height: 150};

// import './App.css';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.toCanvas = this.toCanvas.bind(this);
    // this.getUrl = this.getUrl.bind(this);
    // this.getCadre = this.getCadre.bind(this);
  }

  state = {
    /*
    cadre : {
      width: cadreDefaults.width,
      height: cadreDefaults.height,
      ratio: cadreDefaults.ratio,
    },
    src: null, 
    */
    rendu: null,
  }

  toCanvas(rendu){
    this.setState({...rendu});
  }

  render() {
    const {rendu} = this.state;
    const {toCanvas} = this;
    // console.log('rendu', rendu);
    
    return (
      <div className="container">
          <div className="App-header">
            <h2>Crop manager</h2>
          </div>

          <div className="element">
              <Sources {...{toCanvas}}/>
              <aside id="canvas" className="element-rendu">
                <DrawCanvas {...rendu} />
              </aside>
          </div>
      </div>
    );
  }
}

