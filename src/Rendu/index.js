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

let ref = null;
const typeFile = 'image/jpeg';
const encoder = 0.5;

const canvas = document.createElement('canvas');

export default function DrawCanvas(props) {
    const {cadre, image} = props;
    const {transform} = props;
 

    const width = (cadre) ? cadre.width : 0;
    const height = (cadre) ? cadre.height : 0;
    // const name = (image) ? image.name : 'noname';
    const name = (image) 
    ? image.src.split("/").pop().split(".")[0] 
    : 'noname';
    
    const imageName = `${name}_${width}_${height}.jpg`;
    const canvasStyle = {width, height};
    // const canvasStyle = {width:'100%', height:'auto'};
    // const download = () => ref.toDataURL(typeFile, encoder);
    const download = () => {
        paint(canvas, props);
        return canvas.toDataURL(typeFile, encoder);
    };

    // if (ref && Object.keys(props).length) paint(ref, props);

    return(
        <div>
            <Preview {...props}/>
             {image &&   
                <a 
                className="download-link"
                href={download()} 
                target="_blank"
                download={imageName}> 
                charger  
                {transform && 
                Math.round(transform.translate.dX)}
                </a>
             }
        </div>
    )
}
            /* <canvas ref={e => ref = e} style={canvasStyle} /> */

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
	ctx.scale(scale.x, scale.y);
	ctx.rotate(rotate * RAD);
    ctx.drawImage(image, -(image.width/2), -(image.height/2));
    sharpen(ctx, width, height, 0.5);

}

