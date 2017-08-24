// eslint-disable-next-line 
const  state = { 
    // RENDUS /////////
    // translate
    dX: 0,
    dY: 0,
    // scale
    sX: 1, 
    sY: 1,
    // rotate
    rotate: 0,

    // OBJETS /////////
    pointers: [], 

    unit: {},
    debut: {},
    arrivee: {}, // garder la derniere position du pointeur

    message: '',
    action: '',

    start: {
        translate: {dX: 0, dY: 0},
        rotate: 0,
        scale: 1,
    },
    move: {
        translation: {dX: 0, dY: 0},
        rotation: 0,
        scalation: 1,
    },
    // export
    transform: { 
        translatePx: {dX: 0, dY: 0}, // pixels. ignore pivot
        translate: {dX: 0, dY: 0}, // pourcents
        rotate: 0,
        scale: 1, // valeur
        pivot: {}
    }, 
    // translatePc: {dX: 0, dY: 0}, // pourcents <- à virer

    conteneur: {},
    cropWrapper: {},
    cropper: {},
    
    cadrage: {},
    proxy: {}
};


/* eslint-disable */
import defaults from '../config/instance-init'
import {RAD, IDLE, DONE} from '../config/constantes'

import transformer from '../helpers/transformer-origin'
import {setCropWrapper, setCropper} from '../helpers/cropper-size'
import proxySize from '../helpers/proxy-size'
import {translateEnPourcents, translateEnPixels} from '../helpers/translate-pc-px'
import initTransform from '../Store/transform'


const controlerLib = {
    log() {
        console.log('this : Instance', this);
    },

    execute(action, donnees, state, props){
        // execute(action, ...reste){
        console.log('ACTION', action );
        return this[action] && this[action]( donnees, state, props );
    },

/*
    carManager.execute = function ( name ) {
        return carManager[name] && carManager[name].apply( carManager, [].slice.call(arguments, 1) );
    };

*/
    init(donnees, state) {
        const {conteneur} = state;

        const {cadrage, proxy, transform} = donnees;
        const {containerSize} = conteneur;
        const {translate} = transform;

        // this._cropResize();
        const cropWrapper = setCropWrapper(containerSize, cadrage);
        const cropper = setCropper(cropWrapper, cadrage);

        // this._imageResize();
        const size = proxySize(cadrage, cropper);
        const proxysize = {...proxy, ...size }

        // this._translateResize();
        const translatePx = translateEnPixels(translate, cropper);
        
        const transformPx =  {...transform, translatePx};

        const nextState = {
            isLoading: false,
            cadrage,
            cropWrapper,
            cropper,
            proxy: proxysize,
            transform: transformPx,
        };
        // console.log('nextState', nextState);
        return Object.assign(
            {},
            state,
            nextState,
            this.updateRendu(nextState)
        )
    },

    // updatePosition({type, pointers, sens = 1}, state){
    updatePosition(donnees, state){
        // tester si pointer = undefined

        // translate en pixels
        // const {pivot} = state.transform;
        // const transform = {
        //     translate: state.transform.translatePx,
        //     rotate: state.transform.rotate,
        //     scale: state.transform.scale,
        // };
        
        // changer manip pour nextState
  
        // const manip = transformer(donnees, state);
        /*
        const manip = transformer({
            type, 
            pointers, 
            transform,
            pivot, 
            sens
        }); 
        */
        /*
            manip : {
                transform,
                pointers, 
                action, 
                device,          
                message,
            }
        */
        const nextState = transformer(donnees, state);
/*
        const nextState = Object.assign( 
            {}, 
            manip, 
            {transform: {
                ...manip.transform, 
                // scale: manip.transform.scale, 
                translatePx: manip.transform.translate,
                translate: translateEnPourcents(manip.transform.translate, state.cropper),
                pivot: state.transform.pivot
            },
        });
*/
console.log('nextState', nextState);

        return Object.assign(
            {},
            state,
            nextState,
            this.updateRendu(nextState, nextState.action)
        )   
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
        return Object.assign(
            {},
            state,
            nextState,
            this.updateRendu(nextState)
        )
    },

    rotate90(sens, state) {
        // ajouter sens
        const pointers = Object.keys(state.pointers)
            .map( p => state.pointers[p]);
        return this.updatePosition({type:'reglage R90', pointers, sens}, state);
    },

    transformPreset(action, state) {
        const {image, ...cadrage} = state.cadrage;
        const pivot = {h: 1, v: 1};
        const transform = initTransform(cadrage, image, action);
        const translatePx = translateEnPixels(transform.translate, state.cropper);

        const nextState = {
            transform: {...transform, translatePx, pivot},
        };

        return Object.assign(
            {},
            state,
            nextState,
            this.updateRendu(nextState)
        )
    },

    resize(conteneur, state) {
        if (state.isLoading) return {...state, conteneur};
        
        const {cadrage, proxy, transform} = state;
        const {containerSize} = conteneur;
        const {translate} = transform;        

        // this._cropResize();
        const cropWrapper = setCropWrapper(containerSize, cadrage);
        const cropper = setCropper(cropWrapper, cadrage);
        
        // this._imageResize();
        const size = proxySize(cadrage, cropper);
        const proxysize = {...proxy, ...size }        

        // this._translateResize();
        const translatePx = translateEnPixels(translate, cropper);

        const transformPx =  {...transform, translatePx};

        const nextState = {
            conteneur,
            cropWrapper, 
            cropper, 
            proxy, 
            transform: transformPx,
        };

        return Object.assign(
            {},
            state,
            nextState,
            this.updateRendu(nextState)
        )
     },

    export(state){
        const {translatePx, ...transform} = state.transform;
        return transform;
    },


    updateRendu(args, action=DONE){
        // console.log('args', args);

        const {transform} = args;
        const {pivot, translatePx} = transform;
    
        // si pivot est l'un des deux : h ou v, rotate = 180 - t.rotate ;
        const rotate = ((pivot.h + pivot.v) === 0) 
            ? 180 - transform.rotate
            : transform.rotate;

        const sX = transform.scale * pivot.v;
        const sY = transform.scale * pivot.h;

        const dX = Math.round(translatePx.dX * pivot.h);
        const dY = Math.round(translatePx.dY * pivot.v);

        return {
            dX,
            dY, 
            rotate, 
            sX,
            sY, 
            action
        };

    }

}


export default  controlerLib;