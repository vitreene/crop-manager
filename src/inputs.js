import React from 'react'

// import React, {Component} from 'react'
const isClient = typeof window !== "undefined";
let mouseDown = false;

const Inputs = (props) => {
    let conteneur;
    const {dims, pointerPosition} = props;

    const handleTouch = (e)=>{
        e.stopPropagation();
        e.preventDefault();
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
        pointerPosition(pointers);
    }

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        mouseDown = true;
        // console.log('handleClick', mouseDown);
         eventMouse(e);
    }
    const handleMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log('handleMove', mouseDown);
        if (mouseDown) eventMouse(e);
    }

    const handleUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        mouseDown = false;
        // console.log('handleUp', mouseDown);
    }

    function eventMouse(e) {
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

        pointerPosition(pointers);
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
                    onTouchStart={handleTouch}
                    onTouchMove={handleTouch}
                    onMouseDown={handleClick}
                    onMouseUp={handleUp}
                    onMouseMove={handleMove}
                    />
             </div>
)
};

export default Inputs
