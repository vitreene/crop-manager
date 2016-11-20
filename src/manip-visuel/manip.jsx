import React, { Component/*, PropTypes*/ } from 'react';
import Transformer from './transformer-img' ;
import ManipEvents from './manip-events' ;


const manip = (MyComp) => {

  class ManipWrapper extends Component {
    render(){
      const{maxScale, minScale} = this.props ;
      const transformIMG = new Transformer(maxScale, minScale) ;

      return (
        <MyComp
          {...this.props}
          transformer={transformIMG}
        />
      )
    }
  }

  return ManipWrapper
}

export default manip(ManipEvents)
