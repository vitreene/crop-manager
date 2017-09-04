/* eslint-disable */
import React, {Component} from 'react';

import Sources from './sources'
import DrawCanvas from '../Rendu'
import Header from './Header'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.toCanvas = this.toCanvas.bind(this);
    this.toExport = this.toExport.bind(this);
    this.handleImport = this.handleImport.bind(this);
  }

  state = {
    rendu: null,
    importer: null
  }

  handleImport(importer) {
    // console.log('importer', importer);
    this.setState({importer: importer});
  }

  toCanvas(rendu) {
    this.setState({...rendu});
  }
  toExport(rendu) {
    // console.log('export', rendu);
  }

  render() {
    const {rendu, importer} = this.state;
    const {handleImport, toCanvas, toExport} = this;

    return (
      <div className="container">
        <Header/>

        <main className="crop-manager">
          <Sources 
            {...{importer}}
            handleRendu={toCanvas}
            handleExport={toExport}
          />

          <DrawCanvas {...{rendu, handleImport}}/>
        </main>
      </div>
    );

  }
}
