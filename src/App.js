/* eslint-disable */
import React, {Component} from 'react';

import Manip from './Manip'
import DrawCanvas from './Rendu'
import ChoixCadrage from './choix-cadrage'
import Upload from './upload'
import initial, {presets} from './config/initial'

const image = initial.image;
const cadrage = presets[initial.preset];
const cadre = {width: 200, height: 150};

// import './App.css';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.toCanvas = this.toCanvas.bind(this);
    this.getUrl = this.getUrl.bind(this);
  }

  state = {
    rendu : {
      width: 0,
      height: 0
    },
    upload: null,
    image: null, 
    transform: {
      translate: { dX: 0, dY: 0},
      rotate: 0,
      scale: 1
    }
  }

  toCanvas(manip){
    this.setState(manip);
  }

  getUrl(url) {
    this.setState({upload: url});

  }

  render() {
    const data  = {
      image: {src: this.state.upload},
      cadrage,
      cadre
    }
    const {toCanvas} = this;
    return (
      <div className="container">
          <div className="App-header">
            <h2>Crop manager</h2>
            <aside className="element-upload">
              <Upload getUrl={this.getUrl}/>
              <ChoixCadrage/>
              </aside>
          </div>
          <div className="element">
            <main className="element-wrapper">
              <Manip {...{...data, toCanvas}} />
            </main>
            <aside id="canvas" className="element-rendu">
              {this.state.image && <DrawCanvas {...this.state} />}
            </aside>
        </div>
      </div>
    );
  }
}

