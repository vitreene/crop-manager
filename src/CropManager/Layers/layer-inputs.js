import React from 'react'
import PropTypes from 'prop-types'

import {TOUCH, MOUSE, START, MOVE, END} from '../config/constantes'

// bug : touch si l'on relache d'abord axe, 
// -> pointer devient axe et decale l'image
// bug shift+ clic, relacher le shitft et deplacer -> erreur,

let mouseDown = false;

const Inputs = (props) => {
    const {handleControl} = props;
    const {containerSize, containerPos} = props.state.conteneur;
    
    const handleTouchStart = (e)=>{
        eventTouch(e, [TOUCH, START])
    };
    const handleTouchMove = (e)=>{
        eventTouch(e, [TOUCH,  MOVE])
    };
    const handleTouchEnd = (e)=>{
        eventTouch(e, [TOUCH, END])
    };
    const handleMouseDown = (e) => {
        mouseDown = true;
         eventMouse(e, [MOUSE, START]);
    };
    const handleMouseMove = (e) => {
        if (mouseDown) eventMouse(e, [MOUSE, MOVE]);
    };
    const handleMouseUp = (e) => {
        if (mouseDown){
            mouseDown = false;
            eventMouse(e, [MOUSE, END]);
        }
    };
    const handleMouseWheel = (e) => {
        // e.nativeEvent.deltaY
        // deltaMode, deltaX, deltaY, deltaZ
    };

    function eventTouch(e, type) {
        e.stopPropagation();
        e.preventDefault();        
        const {contDX, contDY} = containerPos;
        const pointers = Object.keys(e.touches)
        .reverse()
        .map( index => (
                {
                    posX: Math.round( e.touches[index].pageX - contDX ),
                    posY: Math.round( e.touches[index].pageY - contDY ),
                }
            )
        )
        .filter(touche => touche.posX && touche.posY);

        handleControl('inputPosition', {type, pointers,  smooth: false});

    }

    function eventMouse(e, type) {
        e.stopPropagation();
        e.preventDefault();

        const {pageX, pageY, shiftKey} = e;
        const {contDX, contDY} = containerPos;
        const {width, height} = containerSize;

        const midX = Math.round( (width * 0.5) );
        const midY = Math.round( (height * 0.5) );  

        const posX = Math.round( pageX - contDX );
        const posY = Math.round( pageY - contDY );

        const pointers = [
            shiftKey && {posX: midX, posY: midY}, // axe
            {posX, posY}, // pointer
        ].filter(Boolean);

        handleControl('inputPosition', {type, pointers, smooth: false});

    }

    return (
            <div 
            className="layer-base inputsWrapper"
            style={containerSize}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleMouseWheel}
            />
    )
};

Inputs.propTypes = {
    handleControl: PropTypes.func, 
    state: PropTypes.object, 
    // containerSize: PropTypes.object, 
    // containerPos: PropTypes.object
}

export default Inputs