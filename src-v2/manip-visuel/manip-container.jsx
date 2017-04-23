import React, { Component, PureComponent } from 'react';
import Manip from './manip' ;

let debounceResizeContainer ;


/*
let transform = (!localStorage.getItem('transform') )
  ? {
      src: require('./img/big-white-bird-big-opt.jpg'),
      pox : 0.023,
      poy : 0.127,
      rot : 18.70,
      ech : 1.40,
      ratio:0.1811,
      cLong:434.90
    }
  :  JSON.parse(localStorage.getItem('transform')) ;

// desactiver transform
 transform = {} ;
{
    "src": "http://localhost:3000/ufs/previews/emJLqvimHmjxbAxoo/2014MMB58.jpg",
    "pox": -0.4573333333333333,
    "poy": -0.2904761790580484,
    "rot": -205.29471970875318,
    "ech": 0.0034837598317255035,
    "containerLong": 750
}
*/
// injecte l'image et le conteneur.
export default class ManipContainer extends PureComponent {
  constructor(props){
    super(props);
    this.containerDims = this.containerDims.bind(this) ;
    this.setDims = this.setDims.bind(this) ;
    this.getRect = this.getRect.bind(this) ;
    this.resizeContainer = this.resizeContainer.bind(this) ;
    this.getRecord = this.getRecord.bind(this) ;
    this._refContainer = this._refContainer.bind(this) ;


    this.state = {
      containerWidth: 0,
      containerHeight: 0,
      containerDX: 0,
      containerDY: 0,
      cLong:100
    }
  }

  componentWillMount() {
    /*
    const drawer = document.getElementById('edit-vue-panel') ;
    drawer.addEventListener("transitionend", (e)=> {
      this.setDims;
  }, false);
  */
  }

  componentDidMount() {
    this.setDims(this._container);

  }

  componentDidUpdate() {
    //console.log('container', this.state);
  }

  componentWillUnMount() {
    console.log('container-unmount', this.state);
    window.removeEventListener('resize', this.resizeContainer );
  }

  _refContainer(el){
    return this._container = el ;
  }

  containerDims(){
    this.getRect(this._container);
  }

  setDims(el){
    this.getRect(el) ;
    window.addEventListener('resize', this.resizeContainer.bind(null,el) );
  }

  resizeContainer(el){
    clearTimeout(debounceResizeContainer);
    debounceResizeContainer = setTimeout(
      ()=> this.getRect(el)
    , 250)
  }

  getRect(el){
    //console.log('getRect el ', el, this._container);
    if (el){
      const{width, height, left, top} = el.getBoundingClientRect() ;
      const ratio = (height===0) ? 1 : width/height ;
      //console.log('getRect',window.scrollX, left, top );

      this.setState({
        containerWidth: width,
        containerHeight: height,
        containerDX: left+ window.scrollX,
        containerDY: top + window.scrollY,
        ratio
      });
    }
  }

  getRecord(record){
    // Le placement de l'image est déterminé à partir des dimensions du conteneur
    // Pox / Poy sont les coordonnées du point central del'image, exprimées en pourcentage d'ecart par rapport au centre du conteneur
    // ech désigne le pourcentage d'echelle à appliquer à l'image en prenant pour unité le coté le plus long du conteneur
    // rotation est passé tel quel.

    const {src, imgWidth, imgHeight, posX, posY, currentScale, currentRotation, miroir} = record ;
    const {zone} = this.props ;
    const {containerWidth, containerHeight, ratio} = this.state ;

    const containerLong = (ratio > 1 )
      ? containerWidth
      : containerHeight ;
    const imgLong = ((imgWidth/imgHeight) > 1)
      ? imgWidth
      : imgHeight ;

    // conversion en pourcents
    const pox = (posX - containerWidth*0.5) / containerWidth ;
    const poy = (posY - containerHeight*0.5) / containerHeight ;
    const rot = currentRotation ;
    const ech = (currentScale*imgLong)/containerLong ;
    const pivX = miroir.h;
    const pivY = miroir.v;

    const transform = {
      pox, poy, rot, ech, zone, pivX, pivY
     } ;

    this.props.onMove(transform) ;
  }

  render() {

    return (
      <div
        className="manip-visuel-container"
        ref={ this._refContainer }
        >
        <Manip
          {...this.props}
          {...this.state}
          record={this.getRecord}
          containerDims={ this.containerDims }
          />
      </div>
    );
  }
}
