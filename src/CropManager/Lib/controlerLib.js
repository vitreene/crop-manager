import transformer from './transformerLib'
import {setCropWrapper, setCropper} from '../helpers/cropper-size'
import proxySize from '../helpers/proxy-size'
import {translateEnPixels} from '../helpers/translate-pc-px'

import initTransform from '../Store/transform'

import {DONE, CMD, R90} from '../config/constantes'

const controlerLib = {
    execute(action, donnees, state) {
        // console.log('ACTION', action );
        return this[action] && this[action]( donnees, state);
    },

    init(donnees, state) {
        const nextState = {
            ...this.preSizes(state.conteneur, donnees),
            isLoading: false,
        };
        return this.update(state, nextState);
    },

    updatePosition(donnees, state){
        const nextState = transformer(donnees, state);
        return this.update(state, nextState, nextState.action);
    },

    pivoter({h,v}, state) {
        // transformer true/false en (-1)/(+1) (true = checked)
        const pivot = {
            h: h ? -1 : 1,
            v: v ? -1 : 1,
        };
        const nextState = {
            transform: {...state.transform, pivot},
        };
        return this.update(state, nextState);
        
    },

    rotate90(sens, state) {
        // ajouter sens
        const pointers = Object.keys(state.pointers)
            .map( p => state.pointers[p]);
        return this.updatePosition({type: [CMD, R90], pointers, sens}, state);
    },

    transformPreset(action, state) {
        const {image, ...cadrage} = state.cadrage;
        const pivot = {h: 1, v: 1};
        const transform = initTransform(cadrage, image, action);
        const translatePx = translateEnPixels(transform.translate, state.cropper);

        const nextState = {
            transform: {...transform, translatePx, pivot},
        };
        return this.update(state, nextState);
        
    },

    resize(conteneur, state) {
        if (state.isLoading) return {...state, conteneur};
        const nextState = this.preSizes(conteneur, state);
        return this.update(state, nextState);
    },
    
    export(state){
        // eslint-disable-next-line
        const {translatePx, ...transform} = state.transform;
        return transform;
    },

    preSizes(conteneur, state){
        const {containerSize} = conteneur;
        const {cadrage} = state;
        const {translate} = state.transform;        
        
        const cropWrapper = setCropWrapper(containerSize, cadrage);
        const cropper = setCropper(cropWrapper, cadrage);
        
        const size = proxySize(cadrage, cropper);
        const proxy = {...state.proxy, ...size }        
        
        const translatePx = translateEnPixels(translate, cropper);
        const transform =  {...state.transform, translatePx};
        return {
            conteneur,
            cadrage,
            cropWrapper, 
            cropper, 
            proxy, 
            transform,
        }
    },

    rendu({transform}) {
        const {pivot, translatePx} = transform;
        // si pivot est l'un des deux : h ou v, rotate = 180 - t.rotate ;
        const rotate = ((pivot.h + pivot.v) === 0) 
            ? 180 - transform.rotate
            : transform.rotate;

        const x = transform.scale * pivot.v;
        const y = transform.scale * pivot.h;

        const dX = Math.round(translatePx.dX * pivot.h);
        const dY = Math.round(translatePx.dY * pivot.v);
        
        return {
            rendu: {
                translate: {dX, dY},
                rotate,
                scale: {x, y}
            }
        }
    },

    update(state, nextState, action = DONE) {
        return Object.assign(
            {},
            state,
            nextState,
            this.rendu(nextState),
            {action}
        )
    }
}

export default  controlerLib;