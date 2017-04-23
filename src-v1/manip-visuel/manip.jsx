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

    // verifier ce calcul !
    initScale(containerWidth,containerHeight,imgWidth,imgHeight){
      return (((containerWidth/imgWidth) * imgHeight) > containerHeight)
        ? containerHeight/imgHeight
        : containerWidth/imgWidth ;
    }

    initTransform(){
      const {visuel, containerWidth, containerHeight} = this.props ;
      const {width:imgWidth, height:imgHeight} = this.img ;

      const imgLong = ((imgWidth/imgHeight) > 1)
        ? imgWidth
        : imgHeight ;

      const containerLong = ((containerWidth /containerHeight) > 1 )
        ? containerWidth
        : containerHeight ;

      // conservion en absolu
      const posX = (visuel.pox+0.5) * containerWidth || containerWidth*0.5  ;
      const posY = (visuel.poy+0.5)* containerHeight || containerHeight*0.5 ;

      const currentRotation = visuel.rot || 0 ;
      const currentScale = ('undefined' === typeof visuel.ech)
        ? this.initScale(containerWidth, containerHeight, imgWidth, imgHeight)
        : (visuel.ech * containerLong)/imgLong ;

      return {
        posX,
        posY,
        currentScale,
        currentRotation,
      };
    }

    render(){
      // eslint-disable-next-line
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
