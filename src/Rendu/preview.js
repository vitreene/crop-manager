
import React from 'react';
let ref = null;
export default function Preview(props) {
    const {image, cadre, transform} = props;
    if (!image) return null;

    const conteneur = ref && ref.offsetWidth;
    console.log('conteneur', conteneur);
    
    // console.log('transform', transform);
    const responsive = conteneur/cadre.width;
    const width = conteneur;
    const height = cadre.height * responsive;
    console.log('responsive', responsive);
    const{
        translate: {dX = 0, dY = 0}, 
        rotate = 0, 
        scale = {x: 1, y: 1},
        } = transform;
    
    // const position = {
    //     w: ((width - image.width) / 2 + dX),
    //     h: ((height - image.height) / 2 + dY),
    // }
    const position = {
        w: ((width - image.width) / 2 + dX* responsive),
        h: ((height - image.height) / 2 + dY* responsive),
    }
    // const position = {
    //     w: ((cadre.width - image.width) / 2 + dX) * responsive,
    //     h: ((cadre.height - image.height) / 2 + dY) * responsive,
    // }
    // const {width, height} = cadre;

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
                className="preview-image-crop-img"
                style={transformation} 
                src={image.src}

            />
            </div>
        </div>
    )
}
//        