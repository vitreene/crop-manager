/* eslint-disable */
import defaults from '../config/instance-init'
import {RAD, DONE} from '../config/constantes'

import transformer from '../helpers/transformer-origin'
// import transformer from '../helpers/transformer'
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
        console.log('this', this);
    }
    report(action) {
        if (action !== DONE) return;
        const {origin, transform:{translate, rotate, angle}} = this;
        const oX = Math.round(origin.oX *100) /100;
        const oY = Math.round(origin.oY *100) /100;
        const ddX = Math.round(translate.dX *100) /100;
        const ddY = Math.round(translate.dY *100) /100;
        console.log('origin', oX, oY, '---- translate', ddX, ddY ,'rotate', rotate, 'angle',angle);
    }

    init(transform, cadrage, proxy) {
        this.transform = transform;
        this.proxy = proxy;
        this.cadrage = cadrage;
        this.isLoading = false;

        this._cropResize();      
        this._imageResize();
        // this._translateResize();
        return this.updateRendu(); 
    }

    updatePosition(type, pointers){
        const {proxy, transform, pivot} = this;
        const manip = transformer({
            proxy,
            type, 
            pointers, 
            transform,
            pivot
        }); 
        /*
            manip : {
                transform,
                pointers, 
                action, 
                device,          
                message,
                hasOrigin
            }
        */
        Object.keys(manip).map(  key => this[key] = manip[key] );

        // this.report(manip.action);        
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

    pivoter(h,v) {
        // transformer true/false en (-1)/(+1) (true = checked)
        this.pivot = {
            h: h ? -1 : 1,
            v: v ? -1 : 1,
        };
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
        const {transform, pivot, proxy, cropper, hasOrigin} = this;
        const {width, height} = proxy;
        const {dX, dY} = transform.translate;

        // si pivot est l'un des deux : h ou v, rotate = 180 - t.rotate ;
        const rotate = ((pivot.h + pivot.v) === 0) 
            ? 180 - transform.rotate
            : transform.rotate;

        const scale = {
            x: transform.scale * pivot.v, 
            y: transform.scale * pivot.h
            // x: 1, 
            // y: 1
        };

      const translate = {
            dX:  Math.round(dX * pivot.h),
            dY:  Math.round(dY * pivot.v)
         };

        this.origin = {
            // oX: (width * 0.5) + transform.origin.dX, // decalage ok
            // oY: (height * 0.5) + transform.origin.dY,
            oX: (width * 0.5) - (dX * hasOrigin), // centre rotation ok
            oY: (height * 0.5) - (dY * hasOrigin),
        };
      
        const {origin} = this;

        return {
            rendu: {
                translate, 
                rotate, 
                scale, 
                origin
            },
            action
        };

    }
}