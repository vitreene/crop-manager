/* eslint-disable */
import React, {Component} from 'react';

import Sources from './sources'
import DrawCanvas from '../Rendu'
import Demo from './demo-file'

import logo from './UI/crop-manager-logo3.svg';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.toCanvas = this.toCanvas.bind(this);
    this.toExport = this.toExport.bind(this);
    this.getImport = this.getImport.bind(this);
  }

  state = {
    rendu: null,
    importer: null
  }

    getImport(importer){
      console.log('importer', importer);
      this.setState({importer: importer});
  }

  toCanvas(rendu){
    this.setState({...rendu});
  }
  toExport(rendu) {
    // console.log('export', rendu);
    
  }

  render() {
    const {rendu, importer} = this.state;
    const { getImport, toCanvas, toExport} = this;
    
    return (
      <div className="container">
          <div className="App-header">
             <img src={logo} className="App-logo" alt="crop-manager" />
          </div>

          <div className="crop-manager">
              <Sources {...{importer}}/>
              
              <aside id="canvas" className="element-rendu">
                <Demo {...{getImport}}/>                
                <DrawCanvas {...rendu} />
              </aside>
          </div>
      </div>
    );

  }
}
