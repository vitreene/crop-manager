import React from 'react';

const LayerImage = ({rendu: transform, visuel, cropper}) => {
    const{translate, rotate = 0, scale = {x: 1, y: 1}} = transform;
    const {dX = 0, dY = 0 } = translate;
    const r = cropper.ratio;

    const transformation = {
       transform: `
        translate3d(${dX * r}px, ${dY * r}px, 0)
        rotate(${rotate}deg)
        scale(${scale.x * r}, ${scale.y * r})
       `,
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

