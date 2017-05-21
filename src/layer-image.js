import React from 'react';

const LayerImage = ({rendu: transform, visuel /*,containerPos, containerSize*/}) => {
    const{translate, rotate = 0, scale = {x: 1, y: 1}} = transform;
    const {dX = 0, dY = 0 } = translate;


    const transformation = {
       transform: `
        translate3d(${dX}px, ${dY}px, 0)
        rotate(${rotate}deg)
        scale(${scale.x}, ${scale.y})
       `
    };

    return (
     <div className="layer-image">
            <img 
            src={visuel} 
            className="layer-image-img"
            style={transformation} 
            role="presentation"/>
     </div>
)};

export default LayerImage;

