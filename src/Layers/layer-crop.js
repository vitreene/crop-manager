import React from 'react';
import Loading from '../Loading'
// tranlate est proportionnel à r ; 
// ce n'est utile que pour le resize.
const LayerCrop = (props) => {
    const {rendu: transform, proxy, cropWrapper, cropper} = props;

    const cropLayer = {
        left: cropWrapper.x,
        top: cropWrapper.y,
        width: cropWrapper.w,
        height: cropWrapper.h
    };

    const cropLayerInner = {
        // left: cropper.x,
        // top: cropper.y,
        width: cropper.w,
        height: cropper.h
    };
    // const r = cropper.ratio;
    const r = 1;
    const{
        translate: {dX = 0, dY = 0}, 
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
    //    transformOrigin: `${oX}px  ${oY}px`,
};


    return (
     <div className="layer-crop">
        <div 
         className="layer-crop-outer"
         style={cropLayer}>
            <div className="layer-crop-inner"
             style={cropLayerInner}>

             { proxy.hasOwnProperty('src')
              ?     <img 
                    src={proxy.src} 
                    style={transformation} 
                    className="layer-crop-img"
                    role="presentation"/>
              :    <Loading/>
             }
            </div>
        </div>
     </div>
)};

export default LayerCrop;

/*


*/