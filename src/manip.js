import React, {Component, PropTypes} from 'react';

import Wrapper from './wrapper'
import LayerInputs from './layer-inputs'
import Reglages from './reglages'
import LayerImage from './layer-image'


import transformer from './transformer'
import newPosition from './new-position'
export default class Manip extends Component {
     static propTypes = {
        id: PropTypes.string
     }
// eslint-disable-next-line
    constructor(props) {
        super(props);
        this.pointerPosition= this.pointerPosition.bind(this);
    }

    state = {
        transform: {translate: {dX: 0, dY:0} },
        pointer: {posX: 0, posY: 0},
        axe: {posX: 0, posY: 0},
        action: null
    }

    pointerPosition({type, pointers, containerSize}) {
         // eslint-disable-next-line
        const [device, action] = type.split(' ');
        const modifier = (pointers.length >1); // 1-> 0 , 2 -> 1
        const pointer = pointers[+modifier];
        const axe = modifier && pointers[0];

        const transform = newPosition({
            prevTransform: this.state.transform, 
            newTransform: transformer({pointer, axe, containerSize,action})}
            );

        this.setState({
            transform,
            pointer,
            axe,
            action
            });
    }

    render() {
      const {pointer, axe, action, transform} = this.state;
      const {id} = this.props;
      return (
            <div id={id} className="manip-conteneur">

                <Wrapper>
                    <LayerImage {...{transform}}/>
                    <LayerInputs pointerPosition={this.pointerPosition}/>
                </Wrapper>
                    <Reglages/>
                    
                    <Pointers {...{transform, pointer, axe, action}} />
                    <Plotters {...{pointer, axe}}/>
                    
            </div>
        );
    }
}


const Pointers = ({transform, action, axe, pointer}) => (
    <div className="pointers-infos">
        { transform.translate && 
        <div>{transform.message} | {transform.translate.dX}%, {transform.translate.dY}% </div>
        }
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
const Plotters = ({axe, pointer}) => {
    const point = {top: pointer.posY, left: pointer.posX};
    const pointAxe = {top: axe.posY, left: axe.posX};
    return (
        <div>
    <span className="plot" style={point}>&#x2299;</span>
    <span className="plot" style={pointAxe}>&#x22a1;</span>
    </div>
);}
