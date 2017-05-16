import React from 'react';
import pic from './UI/big-white-bird-big-opt.jpg';


const LayerImage = (props) => {
    // console.log('props', props);
    // const {transform} = props;
    const {dX, dY} = props.transform.translate;
    console.log(props.transform.translate);
    
    const transform = {
       transform: `translate(${dX || 0}px, ${dY || 0}px)`
    };
    return (
     <div className="layer-image">
         <img src={pic} style={transform}/>
     </div>
)};

export default LayerImage;

