/*
entree : 
- position actuelle 
- action (start, move, end)
- pointer (x,y)
- axe (x,y)
- milieu (x,y)

sortie :
- translate (dx, dy)
- scale (s)
- rotation (r)
*/
const DEG = 180 / Math.PI;
// position initiale
let debut = {posX: 0, posY:0};
let debutAxe = {posX: 0, posY:0};

// valeur du décalage entre début et la nouvelle valeur pointer
// let move = {dX: 0, dY: 0};

// arrivee : position en fin d'action 
let arrivee;
let arriveeAxe;

// export translate : valeur du déplacement en px
let translate = {dX: 0, dY: 0};

let rotate = 0;
let scale = 0;
let rotateStart = 0;
let scaleStart = 0;

// + : le decalage translation
let translation;
let rotation;
let scalation; // ouais ca se dit



export default function(position){
    const {axe} = position;

    return (axe) 
        ? rotateAndScaleImage(position)
        : translateImage(position)
}



function translateImage(position){
    const {pointer, action, transform} = position;
    let message;

    switch (action) {
        case 'start' :
           debut = pointer;
           translation = transform.translate || {dX: 0, dY: 0};
           rotate = transform.rotate || 0;
           scale = transform.scale || 1;
           message = 'c’est parti!' 
        break;
    
        case 'move' :
        translate = { 
            dX: translation.dX + (pointer.posX - debut.posX),
            dY: translation.dY + (pointer.posY - debut.posY),
        }           
           message = `ca bouge! move : ${translate.dX}, ${translate.dY}`;
        break;
    
        case 'end' :
            arrivee = {
                posX: debut.posX + pointer.posX,
                posY: debut.posY + pointer.posY,
            };
            message = `ah c’est fini. Point de départ: ${debut.posX} , ${debut.posY},  point d'arrivée : ${arrivee.posX}, ${arrivee.posY}`; 

        break;
    
        default:
        break;
    }

    return {
        message,
        translate,
        rotate,
        scale
        // info: {debut, arrivee}
        };

}

function rotateAndScaleImage(position) {
    const {pointer, axe, action, transform} = position;
    let message;
    const d = {
        // dX: axe.posX - pointer.posX,
        // dY: axe.posY - pointer.posY,
        dX: pointer.posX - axe.posX,
        dY: pointer.posY - axe.posY,
        }

        switch (action) {
        case 'start' :
            translate = transform.translate || {dX: 0, dY: 0};            rotation = transform.rotate || 0;
            scalation = transform.scale || 1;

            rotateStart = Math.atan2(d.dX, d.dY);
            scaleStart =  Math.sqrt(d.dX * d.dX + d.dY * d.dY);

        break;
    
        case 'move' :

            const stepRotation = Math.atan2(d.dX, d.dY);
            const stepScale = Math.sqrt(d.dX * d.dX + d.dY * d.dY);

            rotate = rotation + Math.round((rotateStart - stepRotation) * DEG);
            scale = scalation + (Math.round(stepScale - scaleStart) * 0.01);

            message = `rotate : ${rotate}, scale : ${scale}, D : ${d.dX}, ${d.dY}, `
        break;
    
        case 'end' :
            message = `Fini de tourner et de scaler.`
        break;
    
        default:
        break;
    }

    return {
        message,
        translate,
        rotate,
        scale
    };
    
}