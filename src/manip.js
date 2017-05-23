import React, {Component, PropTypes} from 'react';

import Controleur from './controleur'

// import 
import visuel from './UI/big-white-bird-big-opt.jpg';

// padding : marge interieure en % entre le crop et le wrapper.
const crop = {w:350, h: 450, padding:5};

export default class Manip extends Component {
     static propTypes = {
        id: PropTypes.string
     }
// eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    state = {}

    render() {
     
      return (
           <Controleur visuel={visuel} crop={crop}/> 
        );
    }
}

/*
dimensions :
x, y pour le top et left de l'élément,
dX, dY : décalage
w, h : largeur hauteur de référence
width, height : dimensions appliquées
*/