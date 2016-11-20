import React, { Component } from 'react';
import Manip from './manip' ;

export default class ManipContainer extends Component {
  constructor(props){
    super(props);
    this.getRect = this.getRect.bind(this) ;

    this.state = {
      containerWidth: 0,
      containerHeight: 0,
      containerDX: 0,
      containerDY: 0,
    }
  }

  componentDidMount() {
  }

  getRect(el){
    const{width, height, left, top} = el.getBoundingClientRect() ;

    console.log('rect : ', left, top, width, height );

    this.setState({
      containerWidth: width,
      containerHeight: height,
      containerDX: left,
      containerDY: top,
    })

  }

  render() {

    return (
      <div
        className="container"
        ref={ this.getRect }
        >
        <Manip
          {...this.state}
          maxScale={2.8}
          minScale={0.4}
          />
      </div>
    );
  }
}
