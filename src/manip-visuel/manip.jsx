import React, { Component/*, PropTypes*/ } from 'react';
import Transformer from './transformer-img' ;
import ManipEvents from './manip-events' ;


// injecte la librairie Transformer et l'initialise lorsque l'image est chargée

export default  class ManipWrapper extends Component {
    constructor(props){
      super(props);
      this.initScale = this.initScale.bind(this);
      this.initTransform = this.initTransform.bind(this);
      this.uploadIMG = this.uploadIMG.bind(this);

      this.img = new Image() ;
      this.state = { imgLoaded: false};
    }

    componentWillMount() {
      this.uploadIMG();
    }

    uploadIMG(){
      const {src} = this.props.visuel ;
      this.img.src = src ;
      this.img.onload = () => {
        this.setState({imgLoaded : true})
      };
    }

    initScale(containerWidth,containerHeight,imgWidth,imgHeight){
      return (((containerWidth/imgWidth) * imgHeight) > containerHeight)
        ? containerHeight/imgHeight
        : containerWidth/imgWidth ;
    }

    initTransform(){
      const {visuel, containerWidth, containerHeight} = this.props ;
      const {imgWidth,imgHeight} = this.state ;
      const ratio = containerWidth /containerHeight ;
      const dim = (ratio > 1 ) ? containerWidth : containerHeight ;
      const posX = visuel.pox * dim || containerWidth*0.5  ;
      const posY = visuel.poy * dim || containerHeight*0.5 ;
      const currentRotation = visuel.rot || 0 ;
      const currentScale = ('undefined' === typeof visuel.ech)
        ? this.initScale(containerWidth, containerHeight, imgWidth, imgHeight)
        : visuel.ech * dim ;

      console.log('initTransform',visuel, posX,posY);

      return {
        posX,
        posY,
        currentScale,
        currentRotation,
      };
    }

    render(){
      const {params, visuel, ...props} = this.props ;

      if (this.state.imgLoaded) {
        const {width, height, src} = this.img ;
        const {posX, posY, currentRotation, currentScale} = this.initTransform() ;
        const transformIMG = new Transformer(params, currentRotation, currentScale) ;

        return (
          <ManipEvents
            {...props}
            transformer={transformIMG}
            src={src}
            posX={posX}
            posY={posY}
            imgWidth={width}
            imgHeight={height}
            />
        )
      } else return (
        <div className="spinner" > Oh ! wait a second… </div>
        );
    }
  }
