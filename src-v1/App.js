import React, { Component } from 'react';
import ManipContainer from './manip-visuel/manip-container' ;


import './App.css';
import logo from './logo.svg';


export default class App extends Component {

  constructor(props){
    super(props);
    this.setMiroir = this.setMiroir.bind(this);
    this.state = {
      miroirH : false,
      miroirV : false
    };
  }

  setMiroir(ev){
    const {checked, name} = ev.target;
    this.setState({[name]:checked}) ;

  }

  render() {
    const params = {maxScale:2.8, minScale:0.4} ;
    const {miroirH, miroirV} = this.state ;
    const miroir= {h:miroirH, v:miroirV} ;
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
        
      <div className="App">
        <ManipContainer
          miroir={miroir}
          params={params}
          />
        <div>
          <label >
          <input
            type="checkbox"
            name='miroirH'
            onClick={this.setMiroir}
            />
          miroirH
        </label>

          <label >
          <input
            type="checkbox"
            name="miroirV"
            onClick={this.setMiroir}
            />
          miroirV
        </label>

        </div>

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
√ responsive au resize
√ transfert des données à l'arret de la fonction.
√ adaptation aux dimensions de l'image importée
- transposition des données à un autre contexte.
lecture des données initiales
√ local storage
- reset des modifications
√ version touch
√ miroir horizontal et vertical
- limites :
  - le contact simultané de deux doigts n'est pas vu
  - depasser la limite bloquant l'image à son milieu
  - le miroir doit s'appliquer au cadre, pas à l'image. inverser les controles.
*/
