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
         axe: {posX: 0, posY: 0},
         action: null
    }

    pointerPosition({type, pointers}) {
        const [device, action] = type.split(' ');
        const modifier = (pointers.length >1); // 1-> 0 , 2 -> 1
        const pointer = pointers[+modifier];
        const axe = modifier && pointers[0];

        this.setState({
            //   pointers,
            pointer,
            axe,
            action
            });
    }

    render() {
      const {pointer, axe, /*pointers, */ action} = this.state;
      const {id} = this.props;
      return (
    <div id={id} className="manip-conteneur">

        <Wrapper>
            <Inputs pointerPosition={this.pointerPosition}/>
        </Wrapper>
            <Reglages/>
            
            <Pointers {...{pointer, axe, action}} />
            <Plotters {...{pointer, axe, action}}/>
               
    </div>
        );
    }
}

 /*<div> <span>{JSON.stringify(pointers)} </span></div>*/


const Pointers = ({action, axe, pointer}) => (
    <div className="pointers-infos">
        { pointer && 
            <div>
                action :{action} - pointer x: {pointer.posX}, y: {pointer.posY} 
            </div> 
        } 
        { axe && 
            <div>axe x: {axe.posX}, y: {axe.posY} </div>
        }
        </div>
);



// placer pointer-events: none; dans la css
// sinon, l'élément capture l'event et onMouseUp n'est pas lancé
const Plotters = ({action, axe, pointer}) => {
    const point = {top: pointer.posY, left: pointer.posX};
    const pointAxe = {top: axe.posY, left: axe.posX};
    return (
        <div>
    <span className="plot" style={point}>&#x2299;</span>
    <span className="plot" style={pointAxe}>&#x22a1;</span>
    </div>
);}
