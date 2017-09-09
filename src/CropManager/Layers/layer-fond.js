import React from 'react';
// import Loading from '../Loading'

const LayerImage = ({rendu: transform, proxy, cropper}) => {
    
    const{
        translate: {dX = 0, dY = 0 }, 
        rotate = 0, 
        scale = {x: 1, y: 1},
    } = transform;
    
    const transformation = {
        width: `${proxy.width}px`,
        height: `${proxy.height}px`,
        transform: `
        translate3d(${dX}px, ${dY}px, 0)
        rotate(${rotate}deg)
        scale(${scale.x}, ${scale.y})
       `
    };

    return (
        <div className="layer-base layer-fond">
            <img role="presentation"
                src={proxy.src} 
                style={transformation} 
                className="layer-fond-img"
                />
        </div>
)};

export default LayerImage;

