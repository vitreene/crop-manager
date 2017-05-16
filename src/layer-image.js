import React from 'react';
import pic from './UI/big-white-bird-big-opt.jpg';


const LayerImage = ({transform}) => {
    const {dX, dY} = transform.translate;
    
    const transformation = {
       transform: `translate(${dX || 0}px, ${dY || 0}px)`
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

