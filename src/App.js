/* eslint-disable */
import React, {Component} from 'react';

import Manip from './manip'

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
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <div className="element-wrapper">
          <Manip/>
        </div>
      </div>
    );
  }
}
