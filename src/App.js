/* eslint-disable */
import React, {Component} from 'react';

import Manip from './Manip'
import DrawCanvas from './Rendu'
import initial, {presets} from './config/initial'

const image = initial.image;
const cadrage = presets[initial.preset];

import './App.css';
import logo from './logo.svg';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.toCanvas = this.toCanvas.bind(this);
  }

  state = {
    rendu : {
      width: 0,
      height: 0
    },
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

  render() {
    const data  = {
      image,
      cadrage
    }
    const {toCanvas} = this;
    return (
      <div className="container">
          <div className="App-header">
            <h2>Manip'image</h2>
          </div>
          <div className="element">
            <main className="element-wrapper">
              <Manip {...{...data, toCanvas}} />
            </main>
            <aside id="canvas" className="element-rendu">
              <DrawCanvas {...this.state} />
            </aside>
        </div>
      </div>
    );
  }
}

