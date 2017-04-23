/* eslint-disable */
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
    this.mousePos = this.mousePos.bind(this);

    const {posX, posY} = props ;
    this.state = {posX, posY} ;
  }

  componentWillMount() {
  }
  componentWillReceiveProps(nextProps){
    this.props.containerDims() ;
    //console.log('containerDims');

    const {posX, posY} = nextProps ;
    this.setState({posX, posY}) ;
  }

  // EVENT TACTILE
  onTouchStart(event) {
    event.preventDefault();

    //this.props.containerDims() ; // mettre à jour position conteneur

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
  mousePos(clientX, clientY){
    const {containerDX,containerDY} = this.props ;
    const eClientX = clientX - containerDX  + window.scrollX ;
    const eClientY = clientY - containerDY  + window.scrollY ;
    return { eClientX, eClientY } ;
  }

  onPlateMouseDown(event) {
    event.preventDefault();

    const {clientX, clientY, shiftKey} = event ;
    const {posX, posY} = this.state ;
    const {eClientX, eClientY} = this.mousePos(clientX, clientY) ;

    document.addEventListener('mouseup', this.onDocumentMouseUp);
    document.addEventListener('mousemove', this.onDocumentMouseMove);
    this.props.transformer.eMouseDown(shiftKey, eClientX, eClientY, posX, posY ) ;
  }

  onDocumentMouseMove(event) {
    const {clientX, clientY, shiftKey} = event ;
    const {posX, posY} = this.state ;
    const {eClientX, eClientY} = this.mousePos(clientX, clientY) ;

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
    const {containerWidth, containerHeight, containerDX, containerDY} = this.props ;
    const {dragDX, dragDY} = this.props.transformer.input ;

    let posX = this.state.posX + dragDX ;
    let posY = this.state.posY + dragDY ;

    /*
    // coordonnées de l'image
    const visuel = document.getElementById('visuel').getBoundingClientRect() ;
    visuel.posX = (visuel.left+ visuel.width/2) ;
    visuel.posY = (visuel.top+ visuel.height/2) ;

    // coordonnées du conteneur
    const container = {
      left:containerDX,
      top: containerDY,
      right: containerDX+ containerWidth,
      bottom: containerHeight + containerDY
    };

    // marges de sécurité
    const margeX = containerWidth/10 ;
    const margeY = containerHeight/10 ;

    // restrictions horizontales
    if ( visuel.right + dragDX < (container.left+ margeX))
      posX = container.left - visuel.width/2 ;
    else if ( visuel.left + dragDX > (container.right-margeX))
      // posX = container.right + visuel.width/2 ;
      posX = container.left + containerWidth + visuel.width/2 ;

    // restrictions verticales
    if ( visuel.bottom + dragDY < (container.top + margeY))
      posY = container.top-visuel.height/2 ;
    else if ( visuel.top + dragDY > (container.bottom-margeY))
      posY = container.bottom+visuel.height/2 ;
      */
    console.log('posX : ', posX, 'posY :', posY);
    //restict horizontally
    if (posX < 0) posX = 0;
    else if (posX > containerWidth) posX = containerWidth;
    //restict vertically
    if (posY < 0) posY = 0;
    else if (posY > containerHeight) posY = containerHeight;

    /*
    const pox = (posX - containerWidth*0.5) / containerWidth ;
    const poy = (posY - containerHeight*0.5) / containerHeight ;
    const mrg = container.right + visuel.width/2 ;
    const cox = ( mrg - containerWidth*0.5) / containerWidth ;
    const vox = ( visuel.posX - containerWidth*0.5) / containerWidth ;
    console.log('pox %s, cox %s ', pox, cox);
*/

    this.setState({posX, posY}) ;
  }

  recordPosition(){
    const {posX, posY} = this.state ;
    const {src, imgWidth, imgHeight, miroir} = this.props ;
    const {currentScale, currentRotation} = this.props.transformer ;

    const record = {
        src,
        imgWidth,
        imgHeight,
        posX,
        posY,
        currentScale,
        currentRotation,
        miroir
    };
    this.props.record(record) ;
  }

  render(){
    const {containerWidth, containerHeight, src, imgWidth, imgHeight, miroir} = this.props ;
    const {posX, posY} = this.state;
    const {currentScale, currentRotation} = this.props.transformer ;

    const container = (containerWidth || containerHeight)
    ? (
      <ContainerTranformerIMG
        miroir={miroir}
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
