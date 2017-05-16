import React from 'react'


let mouseDown = false;

const Inputs = (props) => {
    // let conteneur;
    const {pointerPosition, mid, containerSize, containerPos} = props;

    const handleTouchStart = (e)=>{
        eventTouch(e, 'touch start')
    };
    const handleTouchMove = (e)=>{
        eventTouch(e, 'touch move')
    };
    const handleTouchEnd = (e)=>{
        eventTouch(e, 'touch end')
    };
    const handleMouseDown = (e) => {
        mouseDown = true;
         eventMouse(e, 'mouse start');
    };
    const handleMouseMove = (e) => {
        if (mouseDown) eventMouse(e, 'mouse move');
    };
    const handleMouseUp = (e) => {
        mouseDown = false;
        eventMouse(e, 'mouse end');
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
        pointerPosition({type, pointers});
    }

    function eventMouse(e, type) {
        e.stopPropagation();
        e.preventDefault();

        console.log('mouseDown', mouseDown, type);
        
        const {pageX, pageY, shiftKey} = e;
        const {contDX, contDY} = containerPos;
        const {midX, midY} = mid;

        const posX = Math.round( pageX - contDX );
        const posY = Math.round( pageY - contDY );

        const pointers = [
            {posX, posY},
            shiftKey && {posX: midX, posY: midY}
        ].filter(Boolean);

        pointerPosition({type, pointers});
    }

    // function getRect() {
    //     const {left, top, width, height} = conteneur.getBoundingClientRect();
    //     return  {
    //         containerDX: (isClient) ? left + window.scrollX : 0,
    //         containerDY: (isClient) ? top + window.scrollY : 0,
    //         width, 
    //         height
    //     }
    // }

    
    return (

                    <div 
                    className="inputsWrapper"
                    style={containerSize}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    />
)
};

export default Inputs

/*
            <div 
                ref={ref => conteneur = ref}
                className="manip-edit-conteneur" 
                style={dims}
                >
             </div>
*/