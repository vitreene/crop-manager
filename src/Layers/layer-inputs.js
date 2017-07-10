import React, {PropTypes} from 'react'
// bug : touch si l'on relache d'abord axe, 
// -> pointer devient axe et decale l'image
// bug shift+ clic, relacher le shitft et deplacer -> erreur,

let mouseDown = false;

const Inputs = (props) => {
    const {getPointerPosition, containerSize, containerPos} = props;

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
        if (mouseDown){
            mouseDown = false;
            eventMouse(e, 'mouse end');
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
        getPointerPosition({type, pointers});
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

        getPointerPosition({type, pointers});
    }

    return (
            <div 
            className="inputsWrapper"
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
    pointerPosition: PropTypes.func, 
    middle: PropTypes.object, 
    containerSize: PropTypes.object, 
    containerPos: PropTypes.object
}

export default Inputs