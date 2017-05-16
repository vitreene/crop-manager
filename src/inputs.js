import React from 'react'

// import React, {Component} from 'react'
const isClient = typeof window !== "undefined";
let mouseDown = false;

const Inputs = (props) => {
    let conteneur;
    const {dims, pointerPosition} = props;

    const handleTouchStart = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        eventTouch(e, 'touch start')
    }
    const handleTouchMove = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        eventTouch(e, 'touch move')
    }
    const handleTouchEnd = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        eventTouch(e, 'touch end')
    }
    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        mouseDown = true;
        // console.log('handleClick', mouseDown);
         eventMouse(e, 'mouse start');
    }
    const handleMouseMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log('handleMove', mouseDown);
        if (mouseDown) eventMouse(e, 'mouse move');
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        mouseDown = false;
        eventMouse(e, 'mouse end');
        // console.log('handleUp', mouseDown);
    }

    function eventTouch(e, type) {
        // console.log( e.touches);
        const {containerDX, containerDY} = getRect();
        const pointers = Object.keys(e.touches)
        .reverse()
        .map( index => (
                {
                    posX: Math.round( e.touches[index].pageX - containerDX ),
                    posY: Math.round( e.touches[index].pageY - containerDY ),
                }
            )
        )
        .filter(touche => touche.posX && touche.posY);
        pointerPosition({type, pointers});
    }

    function eventMouse(e, type) {
        const {pageX, pageY, shiftKey} = e;
        const {containerDX, containerDY, width, height} = getRect();

        const posX = Math.round( pageX - containerDX );
        const posY = Math.round( pageY - containerDY );
        const middleX = Math.round( containerDX + (width * 0.5) );
        const middleY = Math.round( containerDY + (height * 0.5) );

        const pointers = [
            {posX, posY},
            shiftKey && {posX: middleX, posY: middleY}
        ].filter(Boolean);

        pointerPosition({type, pointers});
    }

    function getRect() {
        const {left, top, width, height} = conteneur.getBoundingClientRect();
        return  {
            containerDX: (isClient) ? left + window.scrollX : 0,
            containerDY: (isClient) ? top + window.scrollY : 0,
            width, 
            height
        }
    }

    
    return (
            <div 
                ref={ref => conteneur = ref}
                className="manip-edit-conteneur" 
                style={dims}
                >
                    <div className="inputsWrapper"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    />
             </div>
)
};

export default Inputs
