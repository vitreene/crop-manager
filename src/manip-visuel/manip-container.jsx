import React, { Component } from 'react';
import Manip from './manip' ;

export default class ManipContainer extends Component {
  constructor(props){
    super(props);
    this.getRect = this.getRect.bind(this) ;

    this.state = {
      containerWidth:0,
      containerHeight:0
    }
  }

  componentDidMount() {
  }

  getRect(el){
    const{width,height} = el.getBoundingClientRect() ;

    console.log('rect', width,height);

    this.setState({
      containerWidth:width,
      containerHeight:height
    })

  }

  render() {

    return (
      <div
        className="container"
        ref={ this.getRect }

        >
        <Manip
          containerWidth={this.state.containerWidth}
          containerHeight={this.state.containerHeight}
          maxScale={2.8}
          minScale={0.4}
          />
      </div>
    );
  }
}
