import React, { Component } from 'react';
import ManipContainer from './manip-visuel/manip-container' ;


import './App.css';
import logo from './logo.svg';


export default class App extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      <div className="App">
        <ManipContainer >
        </ManipContainer>
      </div>
    </div>
    );
  }
}



/*
reste à faire :
√ tenir compte du décalage de positon;
√ proportions personnalisées du container
  -> rotation est idem ;
  -> scale : ? % du container ?
  -> move % du centre du container
- responsive au resize
- transfert des données à l'arret de la fonction.
- adaptation aux dimensions de l'image importée
- transposition des données à un autre contexte.
lecture des données initiales
- local storage
- reset des modifications
- version touch
*/
