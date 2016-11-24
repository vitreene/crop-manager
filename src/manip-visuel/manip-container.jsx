import React, { Component } from 'react';
import Manip from './manip' ;
//import bird from './big-white-bird-big-opt.jpg';
//import gold from './goldenage-logo.jpg';
//import clim from './bio_climatique-4854.jpg';


const visuel = (!localStorage.getItem('transform') )
  ? {
      src: require('./big-white-bird-big-opt.jpg'),
      pox : 0.48,
      poy : 0.53,
      rot : 26.50,
      ech : 0.002873
    }
  :  JSON.parse(localStorage.getItem('transform')) ;




// injecte l'image et le conteneur.
export default class ManipContainer extends Component {
  constructor(props){
    super(props);
    this.getRect = this.getRect.bind(this) ;
    this.getRecord = this.getRecord.bind(this) ;

    this.state = {
      containerWidth: 0,
      containerHeight: 0,
      containerDX: 0,
      containerDY: 0,
      ratio: 1
    }
  }

  getRecord(src, posX, posY, currentScale, currentRotation){
    const { containerWidth, containerHeight, ratio } = this.state ;
    const dim = (ratio > 1 ) ?containerWidth : containerHeight ;
    const pox = posX / dim ;
    const poy = posY / dim ;
    const rot = currentRotation ;
    const ech = currentScale / dim ;

    localStorage.setItem('transform', JSON.stringify({src, pox, poy, rot, ech}) );
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
    const params = { maxScale:2.8, minScale:0.4} ;
    return (
      <div
        className="container"
        ref={ this.getRect }
        >
        <Manip
          {...this.state}
          params={params}
          visuel={visuel}
          record={this.getRecord}
          />
      </div>
    );
  }
}
