import React from 'react';
// import Loading from '../Loading'

const LayerImage = (props) => {
    const {rendu, proxy, options} = props;

    const transition = `transform ${options.smooth ? 0.3 : 0}s`;
    const{
        translate: {dX = 0, dY = 0 }, 
        rotate = 0, 
        scale = {x: 1, y: 1},
    } = rendu;
    
    const transformation = {
        transition,  
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

