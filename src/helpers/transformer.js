import {RAD, START, MOVE, END, DONE} from '../config/constantes'

// position initiale
let debut = {posX: 0, posY:0};

// arrivee : position en fin d'action 
let arrivee = {posX: 0, posY:0};

// + : le decalage translation
let translation;
let rotation;
let scalation; // ouais ca se dit

// exports
// translate : valeur du déplacement en px
let translate = {dX: 0, dY: 0};
let rotate = 0;
let scale = 1;

let rotateStart = 0;
let scaleStart = 1;
let translateStart = {dX: 0, dY: 0};

// attenuer l'amplitude de la mise à l'échelle
const sensibilite = 2;

export default function ({proxy, type, pointers, transform, pivot}) {
    const [device, action] = type.split(' ');
    const modifier = (pointers.length >1); // 1-> 0 , 2 -> 1
    // console.log('ACTION', action, modifier);

    const pointer = pointers[+modifier];
    const axe = modifier && pointers[0];
    const hasOrigin = modifier && (device === 'mouse');
            
    const {message, ...reste} = whatTransform({
        modifier, 
        pointer, 
        axe, 
        action, 
        transform, 
        pivot
    });
    const done = action === 'end' ? DONE : action;
    return {
        transform: reste,
        pointers: {pointer, axe}, 
        action: done, 
        device,          
        message,
        hasOrigin
    }
}

function whatTransform({modifier, ...reste}) {
    return (modifier) 
        ? rotateAndScaleImage(reste)
        : translateImage(reste)
}


function translateImage({pointer, action, transform, pivot}){
    let message;
// console.log('translateImage');

    switch (action) {
        case START :
           translate = transform.translate || {dX: 0, dY: 0};
           rotate = transform.rotate || 0;
           scale = transform.scale || 1;

           debut = pointer;
           translation = transform.translate || {dX: 0, dY: 0};

           message = 'c’est parti!' 
        break;
    
        case MOVE :
            translate = { 
                dX: translation.dX + (pointer.posX - debut.posX) * pivot.h,
                dY: translation.dY + (pointer.posY - debut.posY) * pivot.v,
            }           
            message = `ca bouge! move : ${translate.dX}, ${translate.dY}`;
        break;
    
        case END :
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
// L'axe doit etre le point central du crop -> remis à jour par resize.

function rotateAndScaleImage({pointer, axe, action, transform, pivot}) {
    // console.log('rotateAndScaleImage');
    
    let message;
    const d = {
        dX: pointer.posX - axe.posX,
        dY: pointer.posY - axe.posY,
    };
    
        switch (action) {
        case START :
            translate = transform.translate || {dX: 0, dY: 0}; 
            rotate = transform.rotate || 0;
            scale = transform.scale || 1;
            
            translation = transform.translate || {dX: 0, dY: 0};
            rotation = transform.rotate || 0;
            scalation = transform.scale || 1;
            
            rotateStart = Math.atan2(d.dX, d.dY) * pivot.h  * pivot.v;
            scaleStart =  Math.sqrt(d.dX * d.dX + d.dY * d.dY);
            translateStart = translate;
        break;
    
        case MOVE :
            const stepRotation = Math.atan2(d.dX, d.dY) * pivot.h * pivot.v ;

            const stepScale = Math.sqrt(d.dX * d.dX + d.dY * d.dY);

            rotate = rotation + Math.round((rotateStart - stepRotation) * RAD);
            scale = scalation + (Math.round(stepScale - scaleStart) * 0.01 / sensibilite);

            // message = `step : ${Math.round(stepRotation *100) /100}, rotate : ${rotate}, scale : ${scale}, D : ${d.dX}, ${d.dY}, `
            message = `axe : ${axe.posX}, ${axe.posY}, D : ${d.dX}, ${d.dY} `
        break;
    
        case END :
         // appliquer une rotation à translate
            const angle = rotation - rotate;
            // translate = rotatePoint(d.dX, d.dY, 0, 0, d.dX, d.dY, angle, 1);

            message = `rotation : ${angle} °`
        break;
    
        default:
        break;
    }

    return {
        message,
        translate,
        rotate,
        // angle: rotation - rotate,
        scale
    };
    
}

function rotatePoint(cx, cy, x, y, tx, ty, angle, scale) {
    // cx, cy : point d'axe,
    // x,y : point à tourner
    // tx, ty : decalage à ajouter
    // angle : angle de otation
    // scale : facteurd'échelle
    const radian = angle * RAD;
    const cos = Math.cos(radian);
    const sin = Math.sin(radian);
    
    return{
        dX: tx + cx + (( cos * (x - cx) - sin * (y - cy) )) * scale,
        dY: ty + cy + (( sin * (x - cx) + cos * (y - cy) )) * scale
    }
}


