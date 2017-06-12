/* eslint-disable */
import {RAD, DEG, START, MOVE, END, DONE} from '../config/constantes'

// position initiale
let debut = {posX: 0, posY:0};

// arrivee : position en fin d'action 
let arrivee = {posX: 0, posY:0};

// angle de rotation
// let angle = 0;

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

let origin = {dX: 0, dY: 0};
let cp = {dX: 0, dY: 0};
let pp = {dX: 0, dY: 0};


// attenuer l'amplitude de la mise à l'échelle
const sensibilite = 2;

export default function ({proxy, type, pointers, transform, pivot}) {
    const [device, action] = type.split(' ');
    const modifier = (pointers.length >1); // 1-> 0 , 2 -> 1
    // console.log('ACTION', action, modifier);

    const pointer = pointers[+modifier];
    const axe = modifier && pointers[0];
    const hasOrigin = modifier && (device === 'mouse');
    // angle = 0;
            
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
        origin,
        translate,
        rotate,
        scale,
        angle: 0
        // info: {debut, arrivee}
        };

}

function rotateAndScaleImage({pointer, axe, action, transform, pivot}) {

    let angle = 0;
    let message;
    const d = {
        dX: pointer.posX - axe.posX,
        dY: pointer.posY - axe.posY,
    };


        switch (action) {
        case START :
            translate = transform.translate || 0;
            rotate = transform.rotate || 0;
            scale = transform.scale || 1;
            
            translation = transform.translate || {dX: 0, dY: 0};
            rotation = transform.rotate || 0;
            scalation = transform.scale || 1;
            
            rotateStart = Math.atan2(d.dX, d.dY) * pivot.h  * pivot.v;
            scaleStart =  Math.sqrt(d.dX * d.dX + d.dY * d.dY);
            translateStart = transform.translate || {dX: 0, dY: 0};
        break;
    
        case MOVE :
            const stepRotation = Math.atan2(d.dX, d.dY) * pivot.h * pivot.v ;

            const stepScale = Math.sqrt(d.dX * d.dX + d.dY * d.dY);

            rotate = rotation + Math.round((rotateStart - stepRotation) * DEG);
            scale = scalation + (Math.round(stepScale - scaleStart) * 0.01 / sensibilite);

            // message = `step : ${Math.round(stepRotation *100) /100}, rotate : ${rotate}, scale : ${scale}, D : ${d.dX}, ${d.dY}, `
            message = `axe : ${axe.posX}, ${axe.posY}, D : ${d.dX}, ${d.dY} `
        break;
    
        case END :
            angle = rotation - rotate;
            message = `rotation : ${angle} °`
        break;
    
        default:
        break;
    }
    
    return {
        message,
        origin,
        translate,
        rotate,
        // angle: rotation - rotate,
        angle,
        scale
    };
    
}
