import React, { Component/*, PropTypes*/ } from 'react';
import Transformer from './transformer-img' ;
import ManipEvents from './manip-events' ;

// ne construite Transformer que si l'image est prete.
// je ne peux pas considerer que l'image sera toujours dispo.
//const manip = (MyComp) => {

export default  class ManipWrapper extends Component {
    constructor(props){
      super(props);
      this.getScale = this.getScale.bind(this);
      this.state = {
        imgLoaded: false,
        imgWidth: 0,
        imgHeight: 0
      };
    }

    componentWillMount() {
      const {visuel} = this.props ;
      const img = new Image() ;
      img.src= visuel ;
      img.onload = () =>{
        this.setState({
          imgWidth  : img.width,
          imgHeight : img.height,
          imgLoaded : true
        })
        console.log('VISUEL', img.width, img.height);
      };

    }
    getScale(containerWidth,containerHeight,imgWidth,imgHeight){
      return (((containerWidth/imgWidth) * imgHeight) > containerHeight)
        ? containerHeight/imgHeight
        : containerWidth/imgWidth ;
    }

    render(){

      if (this.state.imgLoaded) {
          const {containerWidth,containerHeight,maxScale, minScale, visuel} = this.props ;
          const {imgWidth,imgHeight} = this.state ;
          const initScale =  this.getScale(containerWidth,containerHeight,imgWidth,imgHeight) ;

          const transformIMG = new Transformer(maxScale, minScale, initScale) ;

          return (
            <ManipEvents
              {...this.props}
              transformer={transformIMG}
              visuel={visuel}
              visuX={this.state.imgWidth}
              visuY={this.state.imgHeight}
              />
          )
      } else return (
        <div className="spinner" > Oh ! wait a second… </div>
        );
    }
  }

//  return ManipWrapper
//}

//export default manip(ManipEvents)
