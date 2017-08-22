/* eslint-disable */

// todo : adapter en fonctionnel

import {R90, RAD, DEG, START, MOVE, END, DONE} from '../config/constantes'

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
// let translateStart = {dX: 0, dY: 0};

const ted = tourneEtDecale();

let unit = {dX: 0, dY: 0};

// attenuer l'amplitude de la mise à l'échelle
const sensibilite = 2;

export default function ({type, pointers, transform, pivot, sens}) {
    const [device, action] = type.split(' ');

    const modifier = (pointers.length >1); // 1-> 0 , 2 -> 1
    
    const pointer = pointers[+modifier];
    const axe = modifier && pointers[0];

    const what = (action === R90) 
    ? R90
    : modifier
            
    const {message, ...reste} = whatTransform({
        what, 
        pointer, 
        axe, 
        action, 
        transform, 
        pivot,
        sens
    });
    const done = (action === 'end') ? DONE : action;

    return {
        transform: reste,
        action: done, 
        device,          
        pointers: {pointer, axe}, 
        message,
    }
}

function whatTransform({what, ...reste}) {
    switch (what) {
        case false :
        return  translateImage(reste);
        case true :
        return rotateAndScaleImage(reste);  
        case R90 :
        return rotate90(reste)  
        default:
            break;
    }
}


function translateImage({pointer, action, transform, pivot}){
    let message;
    //  console.log('translateImage', pointer);

    switch (action) {
        case START :
           translate = transform.translate || {dX: 0, dY: 0};
           rotate = transform.rotate || 0;
           scale = transform.scale || 1;

           debut = pointer;
           // translateStart
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
        /*
            arrivee = {
                posX: debut.posX + pointer.posX,
                posY: debut.posY + pointer.posY,
            };
            message = `ah c’est fini. Point de départ: ${debut.posX} , ${debut.posY},  point d'arrivée : ${arrivee.posX}, ${arrivee.posY}`; 
            */
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
        // simuler transform-origin

            unit = {
                dX: transform.translate.dX / transform.scale,
                dY: transform.translate.dY / transform.scale,
            };

            translate = transform.translate || 0;
            rotate = transform.rotate || 0;
            scale = transform.scale || 1;
            
            // translation = transform.translate || {dX: 0, dY: 0};
            rotation = transform.rotate || 0;
            scalation = transform.scale || 1;
            
            rotateStart = Math.atan2(d.dX, d.dY) * pivot.h  * pivot.v;
            scaleStart =  Math.sqrt(d.dX * d.dX + d.dY * d.dY);
            // translateStart = transform.translate || {dX: 0, dY: 0};
        break;
    
        case MOVE :
            const stepRotation = Math.atan2(d.dX, d.dY) * pivot.h * pivot.v ;
            const stepScale = Math.sqrt(d.dX * d.dX + d.dY * d.dY);

            const relRotate =  Math.round((rotateStart - stepRotation) * DEG);
            const relScale = Math.round(stepScale - scaleStart) * 0.01 / sensibilite;

            scale = scalation + relScale;
            rotate = rotation + relRotate;

            const translated = ted.decaleAndScale(unit, scale);
            const origin = ted.decale({dX: 0, dY: 0},translated, -1);
            const centre = {dX: 0, dY: 0};
            const centerPoint = ted.tourne(origin, centre, relRotate);

            translate = ted.decale(translated, centerPoint, 1);

            message = `axe : ${axe.posX}, ${axe.posY}, D : ${d.dX}, ${d.dY} `
        break;
    
        case END :
        break;

        case 'R90' :
        // pivoter de 90°
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

function rotate90({action, transform, pivot, sens}) {
    const scale = transform.scale;
    const rotation = (90 * pivot.h * pivot.v * sens);
    const rotate = (transform.rotate + rotation) % 360;
    
    const unit = {
        dX: transform.translate.dX / transform.scale,
        dY: transform.translate.dY / transform.scale,
    };
    const translated = ted.decaleAndScale(unit, scale);
    const origin = ted.decale({dX: 0, dY: 0},translated, -1);
    const centre = {dX: 0, dY: 0};
    const centerPoint = ted.tourne(origin, centre, rotation);

    const translate = ted.decale(translated, centerPoint, 1);

    const message = 'rotation de 90°';
    
    return {
        message,
        translate,
        rotate,
        scale
    };
}


export function tourneEtDecale() {
    function tourne (centre, point, angle) {
        // centre: point d'axe,
        // point : point à tourner
        // angle : angle de rotation
        const radian = angle * RAD;
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);

        const rx = point.dX - centre.dX;
        const ry = point.dY - centre.dY;
        return{
            // x' = x*cos b - y*sin b
            // y' = x*sin b + y*cos b
            dX: centre.dX + ( cos * rx - sin * ry ),
            dY: centre.dY + ( sin * rx + cos * ry )
        }
    }

    function decale(point, translate, sens = 1) {
        return{
            dX: point.dX + (translate.dX * sens),
            dY: point.dY + (translate.dY * sens)
            }
    }

    function decaleAndScale(unit, scale) {
        return{
            dX: unit.dX * scale,
            dY: unit.dY * scale
            }
    }

    return {
        tourne,
        decale,
        decaleAndScale
    }
}


