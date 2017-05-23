/* eslint-disable */
import React, {Component} from 'react';

import Manip from './Manip'

import './App.css';
import logo from './logo.svg';

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="container">
        <div className="App-header">
          <h2>Manip'image</h2>
        </div>
        <div className="element-wrapper">
          <Manip/>
        </div>
      </div>
    );
  }
}
