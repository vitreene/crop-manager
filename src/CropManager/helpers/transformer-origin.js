/* eslint-disable */


import {R90, RAD, DEG, START, MOVE, END, DONE, SENSIBLE} from '../config/constantes'
import {translateEnPourcents} from './translate-pc-px'

// attenuer l'amplitude de la mise à l'échelle
// const sensibilite = 2;

const ted = tourneEtDecale();


export default function (donnees, state) {
    const {type, pointers, sens} = donnees;

    const [device, action] = type;
    const modifier = (pointers.length >1); // 1-> 0 , 2 -> 1
    const pointer = pointers[+modifier];
    const axe = modifier && pointers[0];
    
    // mon hack : 
    // enumerer les conditions, associer un résultat
    // filtrer les résultats vides
    // ne garder que le premier résultat (simplifie les tests)
    const whatUp = [
        (action === R90) && rotate90,
        (modifier === false) && translateImage,
        (modifier === true) && rotateAndScaleImage
    ].filter(Boolean)[0];
    
    const nextState = whatUp({action, pointer, axe, sens }, state);
    console.log('transformer nextState', action, nextState);
    
    const transform = {
        ...nextState.transform,
        translate: translateEnPourcents(nextState.transform.translatePx, state.cropper)
    }
    
    return {
        ...nextState,
        transform,
        action, 
        pointers: {pointer, axe}, 
        device          
    }
}


function translateImage(donnees, state){
    const {action, pointer} = donnees;
    const { transform, start, move } = state;
    
    // let message;
    // console.log('action', action);
    
    switch (action) {
        case START :
        return {
            // debut: pointer,
            start: {            
                // translate: transform.translate || {dX: 0, dY: 0}
                ...start,
                translate: pointer
            },
            move: {  
                ...move,          
                translation: transform.translatePx || {dX: 0, dY: 0}
            },
            transform, 
            message: 'c’est parti!'
        }
        /*
           translate = transform.translate || {dX: 0, dY: 0};

           debut = pointer;
           // translateStart
           translation = transform.translate || {dX: 0, dY: 0};

           message = 'c’est parti!' 
           */
        // break;
    
        case MOVE :
        return {
            transform: {
                ...transform,
                translatePx: { 
                    dX: move.translation.dX + (pointer.posX - start.translate.posX) * transform.pivot.h,
                    dY: move.translation.dY + (pointer.posY - start.translate.posY) * transform.pivot.v,
                }
            },           
            message: `ca bouge! `
        }

        /*
            translate = { 
                dX: translation.dX + (pointer.posX - debut.posX) * pivot.h,
                dY: translation.dY + (pointer.posY - debut.posY) * pivot.v,
            }           
            message = `ca bouge! move : ${translate.dX}, ${translate.dY}`;
        break;
    */
        case END :
        return {
            transform,
            message: 'c’est fini.'
         }
        /*
            arrivee = {
                posX: debut.posX + pointer.posX,
                posY: debut.posY + pointer.posY,
            };
            message = `ah c’est fini. Point de départ: ${debut.posX} , ${debut.posY},  point d'arrivée : ${arrivee.posX}, ${arrivee.posY}`; 
            */
        // break;
    
        // default:
        // break;
    }
/*
    return {
        ...transform,
        translate,
        message,
        };
*/
}
// L'axe doit etre le point central du crop -> remis à jour par resize.

function rotateAndScaleImage(donnees, state) {
    // console.log('rotateAndScaleImage');
    const {action, pointer, axe} = donnees;
    const {transform, unit, start, move} = state;

    const d = {
        dX: pointer.posX - axe.posX,
        dY: pointer.posY - axe.posY,
    };


    switch (action) {
        case START :
        // simuler transform-origin
        return {
            unit: {
                dX: transform.translatePx.dX / transform.scale,
                dY: transform.translatePx.dY / transform.scale,
            },
            start: {
                // translate: transform.translate || 0,
                // rotate: transform.rotate || 0,
                // scale: transform.scale || 1
                ...start,
                rotate: Math.atan2(d.dX, d.dY) * transform.pivot.h * transform.pivot.v,
                scale:  Math.sqrt(d.dX * d.dX + d.dY * d.dY),
            },
            move: {
                ...move,
                rotation: transform.rotate || 0,
                scalation: transform.scale || 1,
            },
            transform,
            message: 'ca tourne, ca scale'


        }
/*
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
            */
        // break;
    
        case MOVE :
            const step = {
                rotate: Math.atan2(d.dX, d.dY) * transform.pivot.h * transform.pivot.v,
                scale: Math.sqrt(d.dX * d.dX + d.dY * d.dY)
            };

            const relatif = {
                rotate: Math.round((start.rotate - step.rotate) * DEG),
                scale: Math.round(step.scale - start.scale) * SENSIBLE
            };

            const scale = move.scalation + relatif.scale;
            const rotate = move.rotation + relatif.rotate;

            const translated = ted.decaleAndScale(unit, scale);
            const centre = {dX: 0, dY: 0};
            const origin = ted.decale(centre, translated, -1);
            const centerPoint = ted.tourne(origin, centre, relatif.rotate);

            const translatePx = ted.decale(translated, centerPoint, 1);

            const message = `axe : ${axe.posX}, ${axe.posY}, D : ${d.dX}, ${d.dY} `

        return {
            transform: {
                ...transform,
                translatePx,
                rotate,
                scale
            },
            message
        }
        // break;
    
        case END :
        return {
            transform,
            message: 'c’est fini.'
         }
        // break;
    }
    
    // return {
    //     message,
    //     translate,
    //     rotate,
    //     scale
    // };
    
}

    
function rotate90(donnees, state) {
    const {action,sens} = donnees;
    const {transform} = state;

    const scale = transform.scale;
    const rotation = (90 * transform.pivot.h * transform.pivot.v * sens);
    const rotate = (transform.rotate + rotation) % 360;
    
    const unit = {
        dX: transform.translatePx.dX / transform.scale,
        dY: transform.translatePx.dY / transform.scale,
    };
    const translated = ted.decaleAndScale(unit, scale);
    const centre = {dX: 0, dY: 0};
    const origin = ted.decale(centre, translated, -1);
    const centerPoint = ted.tourne(origin, centre, rotation);

    const translatePx = ted.decale(translated, centerPoint, 1);

    const message = 'rotation de 90°';
    
    return {
        transform: {
            ...transform,
            translatePx,
            rotate,
            scale
        },
        unit,
        message
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


