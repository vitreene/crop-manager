import React from 'react';
// import Loading from '../Loading'

const LayerImage = ({rendu: transform, proxy, cropper}) => {
    
    const{
        translate: {dX = 0, dY = 0 }, 
        rotate = 0, 
        scale = {x: 1, y: 1},
        origin: {oX = 0, oY = 0}
    } = transform;
    
    const transformation = {
        width: `${proxy.width}px`,
        height: `${proxy.height}px`,
        transform: `
        translate3d(${dX}px, ${dY}px, 0)
        rotate(${rotate}deg)
        scale(${scale.x}, ${scale.y})
       `,
        // transformOrigin: `${oX}px  ${oY}px`
    };

    return (
        <div className="layer-fond">
            <img 
                src={proxy.src} 
                style={transformation} 
                className="layer-fond-img"
                role="presentation"
                />
        </div>
)};

export default LayerImage;

