import React from 'react';

const LayerCrop = (props) => {
    const {rendu: transform, visuel, containerSize, crop} = props;
    const cropBoundingRect = setCropBoundingRect(containerSize, crop);
    const cropInnerRect = setCropInnerRect(cropBoundingRect, crop);

    const cropLayer = {
        left: cropBoundingRect.x,
        top: cropBoundingRect.y,
        width: cropBoundingRect.w,
        height: cropBoundingRect.h
    };

    const cropLayerInner = {
        // left: cropInnerRect.x,
        // top: cropInnerRect.y,
        width: cropInnerRect.w,
        height: cropInnerRect.h
    };

    const r = cropInnerRect.ratio;

    const{translate, rotate = 0, scale = {x: 1, y: 1}} = transform;
    const {dX = 0, dY = 0 } = translate;
    
    const transformation = {
       transform: `
        translate3d(${dX * r}px, ${dY * r}px, 0)
        rotate(${rotate}deg)
        scale(${scale.x * r}, ${scale.y * r})
       `,
    };

    return (
     <div className="layer-crop">
        <div 
            className="layer-crop-outer"
            style={cropLayer}>
            <div className="layer-crop-inner"
                style={cropLayerInner}>

                    <img 
                    src={visuel} 
                    className="layer-crop-img"
                    style={transformation} 
                    role="presentation"/>

            </div>
        </div>
     </div>
)};

export default LayerCrop;

export function setCropBoundingRect(containerSize, crop) {
    if (!containerSize) return;

    const {padding} = crop;
    const w = containerSize.width * ((100 - (padding * 2)) / 100);
    const h = containerSize.height * ((100 - (padding * 2)) / 100);

    const x = (containerSize.width - w ) * 0.5;
    const y = (containerSize.height - h) * 0.5;
    
    return {
        x,
        y,
        w,
        h,
    }
}

function setCropInnerRect(cropBoundingRect, crop) {
    const {cropW, cropH} = crop;

    const ratioW = cropW / cropBoundingRect.w;
    const ratioH = (ratioW > 1) 
        ? cropH / cropBoundingRect.h
        : cropBoundingRect.h / cropH;
    const hZ = cropH * (1 / ratioW);
    const wZ = cropW * ratioH;

    const h = (hZ > cropBoundingRect.h)
        ? cropBoundingRect.h
        : hZ;
    const w = (hZ > cropBoundingRect.h)
        ? wZ
        : cropBoundingRect.w ;
    const x = (cropBoundingRect.w - w) * 0.5;
    const y = (cropBoundingRect.h - h) * 0.5;

    const ratio = w / cropW ;
    return {
        x,
        y,
        w,
        h,
        ratio
    }
}