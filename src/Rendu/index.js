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

const conteneurRendu = {
    width: 100,
    height: 80,
    id: 'canvas'
}

/*
function drawImageCenter(image, x, y, cx, cy, scale, rotation){
    ctx.setTransform(scale, 0, 0, scale, x, y); // sets scale and origin
    ctx.rotate(rotation);
    ctx.drawImage(image, -cx, -cy);
}

*/

function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}

export default function DrawCanvas(props) {
    let ref = null;
    const {width, height} = conteneurRendu;
    
    if (ref){
        const ctx = ref.getContext('2d');
        ctx.clearRect(0,0, 300, 300);
        // draw children “components”
        rect({ctx, x: 10, y: 10, width: 50, height: 50});
        rect({ctx, x: 110, y: 110, width: 50, height: 50});
    }
    console.log('ref', ref);

    return(
        <canvas ref={e => ref = e} width={width} height={height} />
    )
}

;