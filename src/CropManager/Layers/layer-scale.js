import React, {Component, PropTypes} from 'react'
import {TOUCH, MOUSE, 
    START, MOVE, END,
    SCALEMIN, SCALEMAX
} from '../config/constantes'

import '../UI/input-range.css'

// valeur arbitraire, élevée : 
// la ligne axeX - initial représente le vecteur de l'échelle 
const axeX = -1000;
const INITIAL = 0;

// amplitude du curseur entre -10 and 10
const mid = 0;
const max = 10;

// The result should be between 1 an 50
const minv =  Math.LN2;
// force de l'amplification
const maxv = Math.log(50);
// calculate adjustment factor
const scale = (maxv-minv) / (max-mid);

const logslider = (position) =>{
    if (position === 0) return 0;
    const val = Math.sign(position) * 
                Math.exp( minv + scale * 
                (Math.abs(position) - mid) );
    return val;
};

const initialState = {
    value: INITIAL, 
    scale: INITIAL,
    trend: 0, 
    sens: 0,
    min: -max,
    max: max,
    step: 0.1,  
    emit: false
};

export default class LayerScale extends Component {
    static propTypes = {
        handleControl: PropTypes.func, 
        transform: PropTypes.object, 
    }

    constructor(props) {
        super(props);
        this.handleScale = this.handleScale.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    state = initialState;

    componentDidUpdate(prevProps, prevState) {
        this.state.emit && !prevState.emit && this.updateValue();
    }
    
   updateValue(){
        const timer = setTimeout( ()=> {
            // si je bute sur une borne arreter, figer la valeur jusq'à que je change de sens.
            const actualScale = this.props.transform.scale;
            const {sens} = this.state;
            
            const trending = ( 
                (sens === -1 && (actualScale <= SCALEMIN )) || 
                (sens === 1 && (actualScale >= SCALEMAX )) 
            ) ? 0 : sens * Math.abs(this.state.trend);
            
            const scaling = this.state.scale + trending;

            // butée minimale / maximale
            const scale = (scaling > axeX) ? scaling : axeX + 1;

            this.props.handleControl('updateScale', {type:[MOUSE, MOVE], axeX, scale});
            this.setState({scale});
            this.state.emit && this.updateValue();
        }, 30);
        this.setState({timer});
   }

    handleScale(e) {
        const value = parseFloat(e.target.value);
        // trend est value, amplifié aux extrémités.
        const trend = logslider(value);
        // sens du mouvement du curseur : -1 ou 1
        const sens = Math.sign(trend - this.state.trend);
        this.setState({value, trend, sens} );
    }
    
    handleMouseDown() {
        const {scale} = this.state;
        this.props.handleControl('updateScale', {type:[MOUSE, START], axeX, scale});
        this.setState({emit: true});
    }
    
    handleMouseUp() {
        const {scale, timer} = this.state;
        clearTimeout(timer);
        this.props.handleControl('updateScale', {type:[MOUSE, END], axeX, scale});
        this.setState(initialState);
    }

    render(){
        const {state, handleScale, handleMouseUp, handleMouseDown} = this;
        return (
            <div className="input-scale">
                <div className="input-scale-inner">
                <input 
                    className="input-scale-range"
                    type="range" 
                    min={state.min} 
                    max={state.max}
                    step={state.step}
                    value={state.value}
                    onChange={handleScale}
                    onMouseUp={handleMouseUp}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}/>
                </div>
            </div>

        )
    }
};
