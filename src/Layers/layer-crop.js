import React from 'react';

const LayerCrop = (props) => {
    const {rendu: transform, visuel, cropWrapper, cropper} = props;

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
    const r = cropper.ratio;

    const{
        translate: {dX = 0, dY = 0}, 
        rotate = 0, 
        scale = {x: 1, y: 1},
        // origin: {oX = 0, oY = 0}
        } = transform;
    
    const transformation = {
        width: `${visuel.width}px`,
        height: `${visuel.height}px`,
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
                style={cropLayerInner}
                >
                    <img 
                style={transformation} 
                    className="layer-crop-img"
                    src={visuel.src} 
                    role="presentation"/>
 
            </div>
        </div>
     </div>
)};

export default LayerCrop;
