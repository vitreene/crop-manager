import React from 'react';

const LayerCrop = (props) => {
    const {rendu: transform, visuel, /*containerPos,*/ containerSize, crop} = props;
    const cropBoundingRect = setCropBoundingRect(containerSize, crop);

    const{translate, rotate = 0, scale = {x: 1, y: 1}} = transform;
    const {dX = 0, dY = 0 } = translate;
    
    const transformation = {
       transform: `
        translate3d(${dX}px, ${dY}px, 0)
        rotate(${rotate}deg)
        scale(${scale.x}, ${scale.y})
       `,
    };

    const cropLayer = {
        left: cropBoundingRect.x,
        top: cropBoundingRect.y,
        width: cropBoundingRect.w,
        height: cropBoundingRect.h
    };

    return (
     <div 
     className="layer-crop">
        <div className="layer-crop-inner"
             style={cropLayer}>

                <img 
                src={visuel} 
                className="layer-crop-img"
                style={transformation} 
                role="presentation"/>

        </div>
     </div>
)};

export default LayerCrop;

export function setCropBoundingRect(containerSize, crop) {
    if (!containerSize) return;
    /*
    containersize - margin = surface utile,
    contraindre crop dans cette surface,
    sortie :
    cropSize : size crop, 
    cropPos : decalage crop.

    + 
    trnir compte des dimensions du crop
    - adapter à la taille,
    - obtenir un % à employer pour l'image
    */
    const {cropW, cropH, padding} = crop;
    const cropSize = {
        w: containerSize.width * ((100 - (padding * 2)) / 100),
        h: containerSize.height * ((100 - (padding * 2)) / 100),
    }
    const cropPos = {
        x: (containerSize.width - cropSize.w ) * 0.5,
        y: (containerSize.height - cropSize.h) * 0.5
    }

    // console.log('container :', containerSize.width, containerSize.height);
    // console.log('cropSize :', cropSize.w, cropSize.h);
    // console.log('cropPos :', cropPos.x, cropPos.y);
    
    return {
        ...cropSize,
        ...cropPos
    }
}