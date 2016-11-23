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

    this.state = {
      posX:props.containerWidth*0.5 ,
      posY:props.containerHeight*0.5
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      posX:nextProps.containerWidth*0.5 ,
      posY:nextProps.containerHeight*0.5
    })
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
  console.log('onTouchMove', shiftKey, ...posXYs);
    this.props.transformer.eMouseMove(shiftKey, ...posXYs) ;
    this.updatePosXY() ;
  }

  onTouchEnd(event) {
    event.preventDefault();
    //const shiftKey = (event.touches.length === 1) ;
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
  }

  // EVENTS SOURIS
  onPlateMouseDown(event) {
    const {clientX, clientY, shiftKey} = event ;
    const {posX, posY} = this.state ;

    const {containerDX,containerDY} = this.props ;
    const eClientX = clientX - containerDX ;
    const eClientY = clientY - containerDY ;

    event.preventDefault();
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

  render(){
    const {containerWidth,containerHeight, visuel, visuX, visuY} = this.props ;
    const container = (containerWidth || containerHeight)
    ? (
      <ContainerTranformerIMG
        posX={this.state.posX}
        posY={this.state.posY}
        currentRotation={this.props.transformer.currentRotation}
        currentScale={this.props.transformer.currentScale}
        onMouseDown={this.onPlateMouseDown}
        onTouchStart={this.onTouchStart}
        >
        <img id="visuel" key="visuel" src={visuel} role="presentation"
           style={{left: -visuX*0.5, top: -visuY*0.5}} />
        </ContainerTranformerIMG>
    )
    : (
      <div className="spinner" > Oh ! wait a second… </div>
    )

    return container ;
  }
}
