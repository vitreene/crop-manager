import React, {PropTypes} from 'react'

let mouseDown = false;

const Inputs = (props) => {
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
        pointerPosition({type, pointers, containerSize});
    }

    function eventMouse(e, type) {
        e.stopPropagation();
        e.preventDefault();

        const {pageX, pageY, shiftKey} = e;
        const {contDX, contDY} = containerPos;
        const {midX, midY} = mid;

        const posX = Math.round( pageX - contDX );
        const posY = Math.round( pageY - contDY );

        const pointers = [
            {posX, posY},
            shiftKey && {posX: midX, posY: midY}
        ].filter(Boolean);

        pointerPosition({type, pointers, containerSize});
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
            />
    )
};

Inputs.propTypes = {
    pointerPosition: PropTypes.func, 
    mid: PropTypes.object, 
    containerSize: PropTypes.object, 
    containerPos: PropTypes.object
}

export default Inputs