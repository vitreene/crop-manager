/* eslint-disable */
import React, {Component} from 'react';

import Sources from './Sources'
import DrawCanvas from './Rendu'
import Manip from './Manip'

import {storage} from './config/initial'
import {cadreDefaults} from './config/initial'

import logo from './UI/crop-manager-logo3.svg';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.toCanvas = this.toCanvas.bind(this);
    this.toExport = this.toExport.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.getCadre = this.getCadre.bind(this);
    this.setCadre = this.setCadre.bind(this);
  }

  state = {
    /*
    */
    cadre : {
      width: cadreDefaults.width,
      height: cadreDefaults.height,
      ratio: cadreDefaults.ratio,
    },
    src: null, 
    rendu: null,
  }

  getUrl(imgFile) {     
      this.setState({src: imgFile.base64});
  }

  getCadre({width, height, ratio}){
    // bloquer si pas d'image
    this.state.src && 
    this.setState({ cadre: {width, height, ratio} })
  }

  setCadre() {
    return this.state.cadre;
  }
  toCanvas(rendu){
    this.setState({...rendu});
  }
  toExport(rendu) {
    // console.log('export', rendu);
    
  }

  render() {
    const {rendu, src, cadre} = this.state;
    const {getUrl, setCadre, getCadre, toCanvas, toExport} = this;
    // console.log('rendu', rendu);
    
    return (
      <div className="container">
          <div className="App-header">
             <img src={logo} className="App-logo" alt="crop-manager" />
          </div>

          <div className="crop-manager">
              <Sources {...{getUrl, setCadre, getCadre}}>
                <Manip 
                    {...{src, cadre}}
                    handleRendu={toCanvas} 
                    handleExport={toExport}
                    importer={storage}
                />
                </Sources>
              <aside id="canvas" className="element-rendu">
                <DrawCanvas {...rendu} />
              </aside>
          </div>
      </div>
    );
  }
}

