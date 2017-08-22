// passer en functional, supprimer l'état interne -> state

const  state = { 
    // translate
    dX: 0,
    dY: 0,
    // scale
    sX: 1, 
    sY: 1,
    rotate: 0,

    // objets :
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
        translate: {dX: 0, dY: 0}, // pourcents
        rotate: 0,
        scale: 1, // valeur
        pivot: {}
    }, 

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


export default class {
    constructor(props) {
      Object.keys(defaults).map( 
          key => this[key] = props[key] || defaults[key]
          )
    }

    log() {
        console.log('this : Instance', this);
    }

    execute(action, donnees, state, props){
        console.log('ACTION', action );
        return this[action] && this[action]( donnees );
    }

/*
    carManager.execute = function ( name ) {
        return carManager[name] && carManager[name].apply( carManager, [].slice.call(arguments, 1) );
    };

*/
    init({transform, cadrage, proxy}) {
        // console.log('transform, cadrage, proxy', transform, cadrage, proxy);
        if (!transform || !cadrage || !proxy) return {action: IDLE};

        this.isLoading = false;
        this.cadrage = cadrage;

        // this._cropResize();  
        this.cropWrapper = setCropWrapper(this.conteneur.containerSize, cadrage);
        this.cropper = setCropper(this.cropWrapper, cadrage);

        this.translatePc = transform.translate;
        // translateEnPixels
        // 
        // transform devrait rester en pourcents, et n'etre converti qu'au rendu
        const translate = translateEnPixels(transform.translate, this.cropper);
        this.transform = Object.assign( 
            {},
            transform,
            {translate}
        );

        // this.proxy = proxy;
        // this._imageResize();
        this.proxy = Object.assign( 
            {},
            proxy,
            proxySize(this.cadrage, this.cropper)
        );
        return this.updateRendu(); 
    }

    updatePosition({type, pointers, sens = 1}){
        // tester si pointer = undefined

        // translate en pixels
        const {transform, pivot} = this;
        const manip = transformer({
            type, 
            pointers, 
            transform,
            pivot, 
            sens
        }); 
        /*
            manip : {
                transform,
                pointers, 
                action, 
                device,          
                message,
            }
        */
        Object.keys(manip).map(  key => this[key] = manip[key] );

        this.translatePc = translateEnPourcents(transform.translate, this.cropper);      
        return this.updateRendu(manip.action);      
    }

    resize(conteneur) {
        this.conteneur = conteneur;
        if (this.isLoading) return {rendu: this.transform}
        
        this._cropResize();
        this._imageResize();
        this._translateResize();
        return this.updateRendu(); 
    }

    pivoter({h,v}) {
        // transformer true/false en (-1)/(+1) (true = checked)
        this.pivot = {
            h: h ? -1 : 1,
            v: v ? -1 : 1,
        };
        // console.log('h,v', h,v, this.pivot);
        return this.updateRendu(DONE); 
    }

    rotate90(sens) {
        // ajouter sens
        const pointers = Object.keys(this.pointers).map( p => this.pointers[p]);
        this.updatePosition({type:'reglage R90', pointers, sens});
        return this.updateRendu(DONE); 
    }

    transformPreset(action) {
        const {image, ...cadrage} = this.cadrage;
        this.transform = initTransform(cadrage, image, action);
        this.pivot = {h: 1, v: 1};

        return this.updateRendu(DONE); 
    }

    _cropResize() {
        const {cadrage, conteneur: {containerSize} } = this;
        const cropWrapper = setCropWrapper(containerSize, cadrage);
        const cropper = setCropper(cropWrapper, cadrage);

        this.cropWrapper = cropWrapper;
        this.cropper = cropper;
    }

    _imageResize() {
        const size = proxySize(this.cadrage, this.cropper);
        this.proxy = Object.assign( 
            {},
            this.proxy,
            size
        );
    }

    _translateResize(){
        // mettre à l'echelle la translation
        const translate = translateEnPixels(this.translatePc, this.cropper);
        this.transform = Object.assign( 
            {},
            this.transform,
            {translate}
        );
    }
    
    export(){
        const {transform: {rotate,scale}, pivot} = this;
        const translate = translateEnPourcents(this.transform.translate, this.cropper);
        return {
            translate,
            rotate,
            scale, 
            pivot,
        }
    }

    updateRendu(action){
    const {transform, pivot, proxy} = this;
    
        if (!proxy.src) return {action: IDLE};
        
        // const {width, height} = proxy;

        // const {dX, dY} = translateEnPixels(transform.translate, this.cropper);

        const {dX, dY} = transform.translate;

        // si pivot est l'un des deux : h ou v, rotate = 180 - t.rotate ;
        const rotate = ((pivot.h + pivot.v) === 0) 
            ? 180 - transform.rotate
            : transform.rotate;

        const scale = {
            x: transform.scale * pivot.v, 
            y: transform.scale * pivot.h
        };

      const translate = {
            dX:  Math.round(dX * pivot.h),
            dY:  Math.round(dY * pivot.v)
         };

        return {
            rendu: {
                translate, 
                rotate, 
                scale, 
            },
            action
        };

    }
}