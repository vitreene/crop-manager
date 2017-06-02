import React from 'react';
// import Loading from '../Loading'

const LayerImage = ({rendu: transform, proxy, cropper}) => {
    
    // const r = cropper.ratio;
    const r = 1;
    const{
        translate: {dX = 0, dY = 0 }, 
        // translate,
        rotate = 0, 
        scale = {x: 1, y: 1},
        // origin: {oX = 0, oY = 0}
    } = transform;
    
    const transformation = {
        width: `${proxy.width}px`,
        height: `${proxy.height}px`,
        transform: `
        translate3d(${dX * r}px, ${dY * r}px, 0)
        rotate(${rotate}deg)
        scale(${scale.x * r}, ${scale.y * r})
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

