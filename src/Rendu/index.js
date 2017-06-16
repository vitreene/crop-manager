// rendu dans un canvas.
/*
entrées :
l'objet manip :
- image,
- cadre,
- transformation

le canvas:
- id de l'element,
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
import {translateEnPixels} from '../helpers/translate-pc-px'

// const conteneurRendu = {
//     width: 100,
//     height: 80,
//     id: 'canvas'
// }
    // const {width, height} = conteneurRendu;

/*
function drawImageCenter(image, x, y, cx, cy, scale, rotation){
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.rotate(rotation);
    ctx.drawImage(image, -cx, -cy);
}

*/


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
    ctx.translate( width/2 + dX, height/2 + dY);
	ctx.scale(scale, scale);
	ctx.rotate(rotate * RAD);
	ctx.drawImage(image, -(image.width/2), -(image.height/2));
    // drawRotatedImage(ctx, image, dX, dY, rotate, scale,  width, height);
    ctx.restore(); 
}

        // draw children “components”
        // ctx.clearRect(0,0, 300, 300);
        // rect({ctx, x: 10, y: 10, width: 50, height: 50});
        // rect({ctx, x: 110, y: 110, width: 50, height: 50});

// var TO_RADIANS = Math.PI/180; 
function drawRotatedImage(context, image, x, y, angle, scale,  width, height) { 
 
	// save the current co-ordinate system 
	// before we screw with it
	// context.save(); 
 
	// move to the middle of where we want to draw our image

	context.translate( width/2 + x, height/2 + y);
	context.scale(scale, scale);
	context.rotate(angle * RAD);
	context.drawImage(image, -(image.width/2), -(image.height/2));
	// context.drawImage(image, -x, -y );
	// context.drawImage(image, 0, 0 );
 
	// and restore the co-ords to how they were when we began
	// context.restore(); 
}

function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}