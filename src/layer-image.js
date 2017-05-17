import React from 'react';
import pic from './UI/big-white-bird-big-opt.jpg';


const LayerImage = ({transform}) => {
    const{translate, rotate = 0, scale = 1} = transform;
    const {dX = 0, dY = 0 } = translate;
    
    const transformation = {
       transform: `
        translate(${dX}px, ${dY}px)
        rotate(${rotate}deg)
        scale(${scale})
        translateZ(0)
       `
    };

    return (
     <div className="layer-image">
         <img 
         src={pic} 
         style={transformation} 
         role="presentation"/>
     </div>
)};

export default LayerImage;

