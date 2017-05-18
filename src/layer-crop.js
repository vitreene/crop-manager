import React from 'react';
/*
- calculer la place du crop par rapport à ses dimensions de départ.

- calculer le decalage de l'image.
*/

const LayerCrop = (props) => {
    // console.log('Props-crop', props);
    // const {containerPos, containerSize, crop, transform, visuel} = props;
    const {transform, visuel, ...layerCrop} = props;
    const cropBoundingRect = setCropBoundingRect(layerCrop);

    const{translate, rotate = 0, scale = 1} = transform;
    const {dX = 0, dY = 0 } = translate;
    
    const transformation = {
       transform: `
        translate3d(${dX}px, ${dY}px, 0)
        rotate(${rotate}deg)
        scale(${scale})
       `,
        marginLeft: -cropBoundingRect.x,
        marginTop: -cropBoundingRect.y,
    };

    const cropLayer = {
        marginLeft: cropBoundingRect.x,
        marginTop: cropBoundingRect.y,
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

export function setCropBoundingRect({/*containerPos,*/ containerSize, crop}) {
    if (!containerSize) return;
    /*
    containersize - margin = surface utile,
    contraindre crop dans cette surface,
    sortie :
    cropSize : size crop, 
    cropPos : decalage crop.
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