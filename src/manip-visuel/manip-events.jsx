import React, { Component } from 'react'
import ContainerTranformerIMG from './container-tranformer-img' ;
import bird from './big-white-bird-big-opt.jpg';


export default class ManipEvents extends Component {
  constructor(props){
    super(props);

    this.onPlateMouseDown = this.onPlateMouseDown.bind(this) ;
    this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this) ;
    this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this) ;

    this.state = {
      posX:props.containerWidth*0.5 ,//+ props.containerDX,
      posY:props.containerHeight*0.5 //+ props.containerDY
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      posX:nextProps.containerWidth*0.5 ,//+ nextProps.containerDX,
      posY:nextProps.containerHeight*0.5 //+ nextProps.containerDY,
    })
  }

  onPlateMouseDown(event) {
    const {clientX, clientY, shiftKey} = event ;
    const {posX, posY} = this.state ;

    const {containerDX,containerDY} = this.props ;
    const clientDX = clientX - containerDX ;
    const clientDY = clientY - containerDY ;

    event.preventDefault();
    document.addEventListener('mouseup', this.onDocumentMouseUp);
    document.addEventListener('mousemove', this.onDocumentMouseMove);
    this.props.transformer.eMouseDown(posX,posY,clientDX, clientDY, shiftKey) ;
  }

  onDocumentMouseMove(event) {
    const {clientX, clientY, shiftKey} = event ;
    const {posX, posY} = this.state ;

    const {containerDX,containerDY} = this.props ;
    const clientDX = clientX - containerDX ;
    const clientDY = clientY - containerDY ;

    this.props.transformer.eMouseMove(posX,posY,clientDX, clientDY, shiftKey) ;
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
