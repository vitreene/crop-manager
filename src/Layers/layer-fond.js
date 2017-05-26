import React from 'react';

const LayerImage = ({rendu: transform, visuel, cropper}) => {
    const r = cropper.ratio;
    const{
        translate: {dX = 0, dY = 0 }, 
        // translate,
        rotate = 0, 
        scale = {x: 1, y: 1},
        // origin: {oX = 0, oY = 0}
    } = transform;
    
    const transformation = {
        width: `${visuel.width}px`,
        height: `${visuel.height}px`,
        transform: `
        translate3d(${dX * r}px, ${dY * r}px, 0)
        rotate(${rotate}deg)
        scale(${scale.x * r}, ${scale.y * r})
       `,
        // transformOrigin: `${oX}px  ${oY}px`
    };

    return (
     <div className="layer-image">
            <img 
            src={visuel.src} 
            className="layer-image-img"
            style={transformation} 
            role="presentation"/>
     </div>
)};

export default LayerImage;

