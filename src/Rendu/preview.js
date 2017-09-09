
import React from 'react';
let ref = null;

export default function Preview(props) {
    const {image, cadre, transform} = props;
    if (!image) return null;
    const {width, height, responsive} = conteneurSize(ref, cadre);
    const{
        translate: {dX = 0, dY = 0}, 
        rotate = 0, 
        scale = {x: 1, y: 1},
    } = transform;
    const position = {
        w: (width - image.width) / 2 + (dX * responsive),
        h: (height - image.height) / 2 + (dY * responsive),
    };
    const transformation = {
        transform: `
        translate3d(${position.w }px, ${position.h}px, 0)
        rotate(${rotate}deg)
        scale(${scale.x * responsive}, ${scale.y * responsive})
       `
    };

    return (
        <div ref={ e => ref = e}
        className="preview-image-crop"
        >
            <div 
            className="preview-image-crop-inner"
            style={{width, height}}
            >
                <img 
                role="presentation"
                className="preview-image-crop-img"
                style={transformation} 
                src={image.src}
            />
            </div>
        </div>
    )
}


function conteneurSize(ref, cadre) {
    const size = {
        width: ref && ref.offsetWidth,
        height: ref && ref.offsetHeight,
    };
    const responsive = Math.min(
        size.width/cadre.width, 
        size.height/cadre.height
    );

    return {
        width: cadre.width * responsive,
        height: cadre.height * responsive,
        responsive
    }
}
