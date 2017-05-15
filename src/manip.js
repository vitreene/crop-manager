import React, {Component} from 'react';

import Wrapper from './wrapper'
import Inputs from './inputs'
import Reglages from './reglages'

export default class Manip extends Component {
// eslint-disable-next-line
    constructor(props) {
        super(props);
        this.pointerPosition= this.pointerPosition.bind(this);
    }

    state = {
         pointer: {posX: 0, posY: 0},
         pointer2:{posX: 0, posY: 0}
    }

    pointerPosition(pointers) {
        // debugger;
        const modifier = (pointers.length >1); // 1-> 0 , 2 -> 1

        // console.log('pointers', modifier, pointers);
        
        const pointer = pointers[+modifier];
        const axe = modifier && pointers[0];


      this.setState({
          pointers,
        pointer,
        axe
        });
    }

    render() {
      const {pointer, axe, pointers} = this.state;
      const {id} = this.props;
        return (
    <div id={id} className="manip-conteneur">

        <Wrapper>
            <Inputs pointerPosition={this.pointerPosition}/>
        </Wrapper>
            <Reglages/>
            
                {pointer &&<div>pointer x: {pointer.posX}, y: {pointer.posY} </div> } 
                { axe && <div>axe x: {axe.posX}, y: {axe.posY} </div>  }
               
    </div>
        );
    }
}
                /*<div> <span>{JSON.stringify(pointers)} </span></div>*/