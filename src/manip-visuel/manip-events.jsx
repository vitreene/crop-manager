import React, { Component } from 'react'
import ContainerTranformerIMG from './container-tranformer-img' ;


// gestion des evenements souris et tactiles <- à faire
export default class ManipEvents extends Component {
  constructor(props){
    super(props);

    this.onPlateMouseDown = this.onPlateMouseDown.bind(this) ;
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this) ;
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this) ;
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.recordPosition = this.recordPosition.bind(this);

    const {posX, posY} = props ;
    this.state = {posX, posY} ;
  }

  componentWillReceiveProps(nextProps){
    const {posX, posY} = this.props ;
    this.setState({posX, posY}) ;
  }

  // EVENT TACTILE
  onTouchStart(event) {
    event.preventDefault();

    const touches = event.touches.length ;
    const shiftKey = (touches === 2) ;
    let posXYs = [] ;

    for (let t=0 ; t<touches ; t++ ){
      posXYs.unshift(event.touches[t].clientX, event.touches[t].clientY) ;
    } ;

    if (touches === 1) {
      document.addEventListener('touchmove', this.onTouchMove);
      document.addEventListener('touchend', this.onTouchEnd);
      document.addEventListener('touchcancel', this.onTouchEnd);
    }

    this.props.transformer.eMouseDown(shiftKey, ...posXYs) ;

  }

  onTouchMove(event) {
    event.preventDefault();

    const touches = event.touches.length ;
    const shiftKey = (touches === 2) ;
    let posXYs = [] ;

    for (let t=0 ; t<touches ; t++ ){
      posXYs.unshift(event.touches[t].clientX, event.touches[t].clientY) ;
    } ;

    this.props.transformer.eMouseMove(shiftKey, ...posXYs) ;
    this.updatePosXY() ;
  }

  onTouchEnd(event) {
    event.preventDefault();

    const {dragging} = this.props.transformer.input ;
    const touches = event.touches.length ;

    if (touches === 0 && dragging) {
      this.props.transformer.handleDragStop();

      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
      document.removeEventListener('touchcancel', this.onTouchEnd);

    } else if (touches === 1) {
      const posXYs = [event.touches[0].clientX, event.touches[0].clientY] ;

      this.props.transformer.handleGestureStop();
      this.props.transformer.handleDragStart(...posXYs);
    }

    this.recordPosition() ;
  }

  // EVENTS SOURIS
  onPlateMouseDown(event) {
    event.preventDefault();

    const {clientX, clientY, shiftKey} = event ;
    const {posX, posY} = this.state ;

    const {containerDX,containerDY} = this.props ;
    const eClientX = clientX - containerDX ;
    const eClientY = clientY - containerDY ;

    document.addEventListener('mouseup', this.onDocumentMouseUp);
    document.addEventListener('mousemove', this.onDocumentMouseMove);
    this.props.transformer.eMouseDown(shiftKey, eClientX, eClientY, posX, posY ) ;
  }

  onDocumentMouseMove(event) {
    const {clientX, clientY, shiftKey} = event ;
    const {posX, posY} = this.state ;

    const {containerDX,containerDY} = this.props ;
    const eClientX = clientX - containerDX ;
    const eClientY = clientY - containerDY ;

    this.props.transformer.eMouseMove(shiftKey, eClientX, eClientY, posX, posY ) ;
    this.updatePosXY() ;
  }

  onDocumentMouseUp(event) {
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
    document.removeEventListener('mousemove', this.onDocumentMouseMove);
    this.props.transformer.eMouseUp(event) ;
    this.recordPosition() ;
  }

  updatePosXY(){
    const {containerWidth, containerHeight} = this.props ;
    const {dragDX, dragDY} = this.props.transformer.input ;

    let posX = this.state.posX + dragDX ;
    let posY = this.state.posY + dragDY ;

    //restict horizontally
    if (posX < 0) posX = 0;
    else if (posX > containerWidth) posX = containerWidth;

    //restict vertically
    if (posY < 0) posY = 0;
    else if (posY > containerHeight) posY = containerHeight;

    this.setState({posX, posY}) ;
  }




  recordPosition(){

    const {posX, posY} = this.state ;
    const {src} = this.props ;
    const {currentScale, currentRotation} = this.props.transformer ;

    this.props.record(src, posX, posY, currentScale, currentRotation) ;

    return  ;
    console.log('position : ', Math.round(posX), Math.round(posY), Math.round(currentScale*100)/100, Math.round(currentRotation) );
    const {containerWidth, containerHeight, ratio} = this.props ;
    /* SORTIE
    données : (posX, posY, currentScale, currentRotation) = image ; (w, h) = zone ; dim  = wrapper.
    px = posX / dim ;
    py = posY / dim ;
    sc = scale /dim
    rot = rotation
    */
    const dim = (ratio > 1 ) ?containerWidth : containerHeight ;
    const pox = posX / dim ;
    const poy = posY / dim ;
    const rot = currentRotation ;
    const ech = currentScale / dim ;

    console.log('record : ', dim, pox, poy, rot, ech);

    const transform = {
      pox : 0.4831704701642133,
      poy : 0.5340000020751955,
      rot : 26.50945903362782,
      ech : 0.0028736238056335573
    }

    /* ENTREE
    dim = coté du conteneur
    div#wrapper -> #conteneur[carré] -> layer#visuel , layer#masque - layer#zone

    carré <- dim = coté-long du conteneur ;
    visuel : posX = px *  dim ; posY = py * dim ; scale = sc * dim ; rotation = rot .
    zone : si ratio > 1 : containerWidth = dim * long, containerHeight = containerWidth * ratio.
    	si ratio < 1 : containerHeight = dim * long, containerWidth = containerHeight * ratio.
    	x= dim-containerWidth /2, y = dim-containerHeight / 2

    */
    const e_dim = (ratio > 1 ) ?containerWidth : containerHeight ;
    const e_posX = transform.pox * dim ;
    const e_posY = transform.poy * dim ;
    const e_currentScale = transform.ech * dim ;
    const e_currentRotation = transform.rot ;

    const transformEnter = {
      posX: e_posX,
      posY: e_posY,
      currentScale: e_currentScale,
      currentRotation: e_currentRotation
    };

    console.log('positionE: ', Math.round(e_posX), Math.round(e_posY),
    Math.round(e_currentScale*100)/100, Math.round(e_currentRotation) );

    //this.setState({posX:e_posX, posY:e_posY}) ;
    //this.props.transformer.init(e_currentScale, e_currentRotation) ;

  }

  render(){
    const {containerWidth, containerHeight, src, imgWidth, imgHeight} = this.props ;
    const {posX, posY} = this.state;
    const {currentScale, currentRotation} = this.props.transformer ;

    const container = (containerWidth || containerHeight)
    ? (
      <ContainerTranformerIMG
        posX={posX}
        posY={posY}
        currentRotation={currentRotation}
        currentScale={currentScale}
        onMouseDown={this.onPlateMouseDown}
        onTouchStart={this.onTouchStart}
        >
        <img id="visuel" key="visuel" src={src} role="presentation"
           style={{left: -imgWidth*0.5, top: -imgHeight*0.5}} />
        </ContainerTranformerIMG>
    )
    : (
      <div className="spinner" > Oh ! wait a second… </div>
    )

    return container ;
  }
}
