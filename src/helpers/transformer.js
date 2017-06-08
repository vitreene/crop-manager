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

const ted = tourneEtDecale();
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
        origin,
        translate,
        rotate,
        scale,
        angle: 0
        // info: {debut, arrivee}
        };

}
// L'axe doit etre le point central du crop -> remis à jour par resize.

function rotateAndScaleImage({pointer, axe, action, transform, pivot}) {
    // console.log('rotateAndScaleImage');
    let angle = 0;
    let message;
    const d = {
        dX: pointer.posX - axe.posX,
        dY: pointer.posY - axe.posY,
    };


        switch (action) {
        case START :
/*
           origin = ted.decale({dX: 0, dY: 0}, transform.translate, -1);
            pp = {dX: 0, dY: 0};
           cp =
            ted.tourne(
                origin,
                pp,
                transform.rotate,
                // transform.scale,
                1
            );
           translate = ted.decale(transform.translate, cp, -1);
            console.log('translate TED', 
            'origin : ',origin, 
            'point tourné', cp, 
            'translate',translate, 
            transform.rotate);
*/

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
        /*
           pp =
            ted.reTourne(
                origin,
                cp,
                rotate,
                // transform.scale,
                1
            );
           cp = ted.decale(pp, transform.translate, -1);
           translate = cp;
           origin = {dX: 0, dY: 0} // transform.translate;
           console.log('end rotate', pp, cp);
           */
        /*

         */
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


export function tourneEtDecale() {
    function tourne (centre, point, angle, scale) {
        // centre: point d'axe,
        // point : point à tourner
        // angle : angle de rotation
        // scale : facteurd'échelle
        const rx = point.dX - centre.dX;
        const ry = point.dY - centre.dY;
        const radian = angle * RAD;
        const cos = Math.cos(radian);
        const sin = Math.sin(radian);
        return{
            // x' = x*cos b - y*sin b
            // y' = x*sin b + y*cos b
            dX: centre.dX + ( cos * rx - sin * ry ) * scale,
            dY: centre.dY + ( sin * rx + cos * ry ) * scale
        }
    }
    function reTourne (centre, point, angle, scale) {
        return tourne(centre, point, -angle, 1/scale)
    }

    function decale(point, translate, sens = 1) {
        // dX, dY : position de départ
        // tx, ty : decalage à ajouter
      return{
        dX: point.dX + (translate.dX * sens),
        dY: point.dY + (translate.dY * sens)
        }
    }

    return {
        tourne,
        reTourne,
        decale
    }
}



export function rotatePoint(cx, cy, x, y, /*tx, ty,*/ angle, scale) {
    // cx, cy : point d'axe,
    // x,y : point à tourner
    // tx, ty : decalage à ajouter -> sortir de la fonction.
    // angle : angle de rotation
    // scale : facteurd'échelle
    const radian = angle * RAD;
    const cos = Math.cos(radian);
    const sin = Math.sin(radian);
    
    return{
        dX: /*tx + */cx + (( cos * (x - cx) - sin * (y - cy) )) * scale,
        dY: /*ty + */cy + (( sin * (x - cx) + cos * (y - cy) )) * scale
    }
}

