import React, { Component } from 'react';
import Manip from './manip' ;
//import bird from './big-white-bird-big-opt.jpg';
//import gold from './goldenage-logo.jpg';
//import clim from './bio_climatique-4854.jpg';


/*
const visuel = {
  src: require('./big-white-bird-big-opt.jpg'),
};
*/

let visuel = (!localStorage.getItem('transform') )
  ? {
      src: require('./big-white-bird-big-opt.jpg'),
      pox : 0.023,
      poy : 0.127,
      rot : 18.70,
      ech : 1.40,
      ratio:0.1811,
      cLong:434.90
    }
  :  JSON.parse(localStorage.getItem('transform')) ;



// injecte l'image et le conteneur.
export default class ManipContainer extends Component {
  constructor(props){
    super(props);
    this.setDims = this.setDims.bind(this) ;
    this.getRect = this.getRect.bind(this) ;
    this.getRecord = this.getRecord.bind(this) ;

    this.state = {
      containerWidth: 0,
      containerHeight: 0,
      containerDX: 0,
      containerDY: 0,
      cLong:100
    }
  }


  setDims(el){
    this.getRect(el) ;
    window.addEventListener('resize', debounce( ()=> this.getRect(el), 250) );
  }

  getRecord(src, imgWidth, imgHeight, posX, posY, currentScale, currentRotation){
    // Le placement de l'image est déterminé à partir des dimensions du conteneur
    // Pox / Poy sont les coordonnées du point central del'image, exprimées en pourcentage d'ecart par rapport au centre du conteneur
    // ech désigne le pourcentage d'echelle à appliquer à l'image en prenant pour unité le coté le plus long du conteneur
    // rotation est passé tel quel.

    const { containerWidth, containerHeight, ratio } = this.state ;
    const containerLong = (ratio > 1 ) ? containerWidth : containerHeight ;
    const imgLong = ((imgWidth/imgHeight) > 1) ? imgWidth : imgHeight ;

    // conversion en pourcents
    const pox = (posX - containerWidth*0.5) / containerWidth ;
    const poy = (posY - containerHeight*0.5) / containerHeight ;
    const rot = currentRotation ;
    const ech = (currentScale*imgLong)/containerLong ;
//  ech  = (4*500)/1500 = 1,33 ;

    //scale = (1,33*500)/1500 = 

    visuel = {src, pox, poy, rot, ech, containerLong } ;
    localStorage.setItem('transform', JSON.stringify(visuel) );
  }

  getRect(el){
    const{width, height, left, top} = el.getBoundingClientRect() ;
    const ratio = (height===0) ? 1 : width/height ;

    this.setState({
      containerWidth: width,
      containerHeight: height,
      containerDX: left,
      containerDY: top,
      ratio
    })

  }

  render() {

    return (
      <div
        className="container"
        ref={ this.setDims }
        >
        <Manip
          {...this.props}
          {...this.state}
          visuel={visuel}
          record={this.getRecord}
          />
      </div>
    );
  }
}


function debounce(func, wait, immediate) {
  // https://davidwalsh.name/javascript-debounce-function
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
