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
import {RAD} from './config/constantes'
import sharpen from './sharpen'

import Preview from './preview'

// let ref = null;
const TYPEFILE = 'image/jpeg';
const ENCODER = 0.5;
const SHARP = 0.5;

const canvas = document.createElement('canvas');
let ref;

export default function DrawCanvas(props) {
    const {cadre, image} = props;

    const width = (cadre) ? cadre.width : 0;
    const height = (cadre) ? cadre.height : 0;
    // image && console.log('image', image.name);
    
    const name = (image && image.name) || 'untitled';
    const imageName = `${name}_${width}_${height}.jpg`;
    
    function downloadCanvas() {
        paint(canvas, props);
        ref.href = canvas.toDataURL(TYPEFILE, ENCODER);
        ref.download = imageName;
    }
    
    return(
        <div>
            <Preview {...props}/>
             {image &&   
                <a 
                ref={ r => ref = r}
                onClick={downloadCanvas}
                className="download-link"
                target="_blank"> 
                Télécharger
                </a>
             }
        </div>
    )
}

function paint(ref, props) {  
    if (!ref || !props.image) return;
    const {image, cadre, transform} = props;
    const {width, height} = cadre;
    const {translate, rotate, scale} = transform;
    const {dX, dY} = translate;

    ref.width = width;
    ref.height = height;
    const ctx = ref.getContext('2d');

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#f90';
    ctx.fillRect(0,0, width, height);

    ctx.translate(width/2 + dX, height/2 + dY);
	ctx.rotate(rotate * RAD);
	ctx.scale(scale.x, scale.y);
    ctx.drawImage(image, -(image.width/2), -(image.height/2));
    sharpen(ctx, width, height, SHARP);

}

