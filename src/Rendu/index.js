// rendu dans un canvas.
/*
entrées :
l'objet manip :
- image,
- transformation

le canvas:
- dimensions du canvas à creer
https://stackoverflow.com/questions/17411991/html5-canvas-rotate-image

opération : 
- creer le canvas aux dimensions demandées
- adapter l'échelle de l'image : au rapport image/crop, ajouter le rapport crop/ canvas.
draw image ;
- trouver un script sharpen
- crrer les images, au choix png/jpeg, save image.
*/

import React from 'react';
import {RAD} from '../config/constantes'
// import {translateEnPixels} from '../helpers/translate-pc-px'
import sharpen from './sharpen'

let ref = null;

export default function DrawCanvas(props) {
    const {width = 0, height = 0} = props.rendu;
    if (ref) paint(ref.getContext('2d'), props)
    return(
        <canvas ref={e => ref = e} width={width} height={height} />
    )
}

function paint(ctx, props) {
    const {image, rendu, transform} = props;
    const {width, height} =rendu;
    const {translate, rotate, scale} = transform;
    const {dX, dY} = translate;

    ctx.save(); 
    ctx.clearRect(0,0, width, height);
    ctx.translate(width/2 + dX, height/2 + dY);
	ctx.scale(scale.x, scale.y);
	ctx.rotate(rotate * RAD);
	ctx.drawImage(image, -(image.width/2), -(image.height/2));
    sharpen(ctx, width, height, 0.9)
    ctx.restore(); 
}
