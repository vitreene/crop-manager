import React from 'react';
// import pic from './UI/big-white-bird-big-opt.jpg';


const LayerImage = ({transform, visuel}) => {
    const{translate, rotate = 0, scale = 1} = transform;
    const {dX = 0, dY = 0 } = translate;
    
    const transformation = {
       transform: `
        translate3d(${dX}px, ${dY}px, 0)
        rotate(${rotate}deg)
        scale(${scale})
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

