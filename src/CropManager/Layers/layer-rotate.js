// simplifier ce module !
// ne recopie pas la problématique de scale.

// a faire : séparer la logique de la présentation, pour une meilleure portabilité.

import React, {Component, PropTypes} from 'react'
import {
    MOUSE, 
    START, MOVE, END,
} from '../config/constantes'

import '../UI/input-range.css'

// valeur arbitraire, élevée : 
// la ligne axeX - initial représente le vecteur de l'échelle 
// const axeX = -1000;
const INITIAL = 0;

// amplitude du curseur entre -10 and 10
const mid = 0;
const max = 180;

// The result should be between 1 an 50
const minv =  Math.LN2;
// force de l'amplification
const maxv = Math.LN10;
// calculate adjustment factor
const scale = (maxv-minv) / (max-mid);
/*
const logslider = (position) =>{
    if (position === 0) return 0;
    const val = Math.sign(position) * 
                Math.exp( minv + scale * 
                (Math.abs(position) - mid) );
    return val;
};
*/
const initialState = {
    value: INITIAL, 
    rotate: INITIAL,
    trend: 0, 
    min: -max,
    max: max,
    step: 1, 
    emit: false
};

export default class LayerRotate extends Component {
    static propTypes = {
        handleControl: PropTypes.func, 
        state: PropTypes.object, 
        // transform: PropTypes.object, 
        // conteneur: PropTypes.object, 
    }

    constructor(props) {
        super(props);
        this.handleRotate = this.handleRotate.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleModifyStep = this.handleModifyStep.bind(this);
    }
    
    state = initialState;

    componentDidUpdate(prevProps, prevState) {
        this.state.emit && !prevState.emit && this.updateValue();
    }
    
   updateValue(){
        const timer = setTimeout( ()=> {
            const rotate = (this.state.rotate + this.state.value)  % 360;
            this.props.handleControl('updateRotate', {type:[MOUSE, MOVE], rotate});
            this.state.emit && this.updateValue();
        }, 30);
        this.setState({timer});
   }

    handleRotate(e) {
        const value = parseFloat(e.target.value);
        this.setState({value} );
    }
    
    handleMouseDown() {
        const {rotate} = this.props.state.transform;
        this.props.handleControl('updateRotate', {type:[MOUSE, START], rotate});
        this.setState({emit: true, rotate});
    }
    
    handleMouseUp() {
        const {rotate, timer} = this.state;
        clearTimeout(timer);
        this.props.handleControl('updateRotate', {type:[MOUSE, END], rotate});
        this.setState(initialState);
    }
    
    handleModifyStep(e){
        const {shiftKey} = e;
        this.setState({step: shiftKey ? 15 : 1});
    }

    get size(){
        const {height} =  this.props.state.conteneur.containerSize;
        // largeur : 5% du conteneur. 
        return {width: height - (height * 0.2)}
    }

    render(){
        const {state, handleRotate, handleMouseUp, handleMouseDown, handleModifyStep} = this;
        return (
            <div className="input-rotate">
                <div className="input-rotate-inner">
                <input 
                    className="input-scale-range"
                    style={this.size}
                    type="range" 
                    min={state.min} 
                    max={state.max}
                    step={state.step}
                    value={state.value}
                    onChange={handleRotate}
                    onMouseUp={handleMouseUp}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                    onKeyDown={handleModifyStep}
                    />
                </div>
            </div>

        )
    }
};
