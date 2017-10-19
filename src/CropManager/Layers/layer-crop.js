import React from 'react';

const LayerCrop = (props) => {
    const {rendu: transform, proxy, cropWrapper, cropper, options} = props;
    const transition = `transform ${options.smooth ? 0.3 : 0}s`;
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

    const{
        translate: {dX = 0, dY = 0}, 
        rotate = 0, 
        scale = {x: 1, y: 1},
        } = transform;
    
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
     <div className="layer-base layer-crop">
        <div 
         className="layer-crop-outer"
         style={cropLayer}>
            <div className="layer-crop-inner"
             style={cropLayerInner}>
                <div className="img-wrap">
                    <img alt=""
                        src={proxy.src} 
                        style={transformation} 
                        className="layer-crop-img"/>
                </div>
            </div>
        </div>
     </div>
)};

export default LayerCrop;
