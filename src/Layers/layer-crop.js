import React from 'react';
// import Loading from '../Loading'
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

    const{
        translate: {dX = 0, dY = 0}, 
        rotate = 0, 
        scale = {x: 1, y: 1},
        origin: {oX = 0, oY = 0}
        } = transform;
    
    const transformation = {
        width: `${proxy.width}px`,
        height: `${proxy.height}px`,
        transform: `
        translate3d(${dX}px, ${dY}px, 0)
        rotate(${rotate}deg)
        scale(${scale.x}, ${scale.y})
       `,
    //    transformOrigin: `${oX}px  ${oY}px`,
};

    const soX = Math.round(oX *100) /100;
    const soY = Math.round(oY *100) /100;
    const sdX = Math.round(dX *100) /100;
    const sdY = Math.round(dY *100) /100;
// console.log('origin', soX, soY);
// console.log('translate', sdX, sdY);

     const pOrigin = {top: oY, left: oX, color: 'cyan'};
    //  const pOrigin = {top: 0, left: 0, color: 'cyan'};

    return (
     <div className="layer-crop">
        <div 
         className="layer-crop-outer"
         style={cropLayer}>
            <div className="layer-crop-inner"
             style={cropLayerInner}>
             <div className="img-wrap" >
             <img 
                src={proxy.src} 
                style={transformation} 
                className="layer-crop-img"
                role="presentation"
            />
            <span className="plot" style={pOrigin}>&#215;</span>
            </div>
            </div>
        </div>
     </div>
)};

export default LayerCrop;

/*


*/