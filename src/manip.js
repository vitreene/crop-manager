import React, {Component, PropTypes} from 'react';

import Controleur from './controleur'

// import 
import visuel from './UI/big-white-bird-big-opt.jpg';

// padding : marge interieure en % entre le crop et le wrapper.
const crop = {cropW:500, cropH: 350, padding:10};

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
