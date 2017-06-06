/* eslint-disable */
import defaults from '../config/instance-init'
import {RAD, DONE} from '../config/constantes'

import transformer from '../helpers/transformer'
import {setCropWrapper, setCropper} from '../helpers/cropper-size'
import proxySize from '../helpers/proxy-size'
import {translateEnPourcents, translateEnPixels} from '../helpers/translate-pc-px'


export default class {
    constructor(props) {
      Object.keys(defaults).map( 
          key => this[key] = props[key] || defaults[key]
          )
    }

    log() {
        console.log('this', this);
    }

    init(transform, cadrage, proxy) {
        this.transform = transform;
        this.proxy = proxy;
        this.cadrage = cadrage;
        this.isLoading = false;

        this._cropResize();      
        this._imageResize();
        // this._translateResize();
        this.updateRendu(); 
    }

    updatePosition(type, pointers, cb){
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

        this.translatePc = translateEnPourcents(manip.transform.translate, this.cropper);
        
        this.updateRendu(); 
        cb && cb(manip.action);
    }

    resize(conteneur) {
        this.conteneur = conteneur;
        if (this.isLoading) return false
        
        this._cropResize();
        this._imageResize();
        this._translateResize();
        this.updateRendu(); 
    }

    pivoter(h,v, cb) {
        // transformer true/false en (-1)/(+1) (true = checked)
        this.pivot = {
            h: h ? -1 : 1,
            v: v ? -1 : 1,
        };
        this.updateRendu(); 
        cb && cb(DONE);
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
    
    updateRendu(callback){
        /*
        - mettre le transform à l'échelle locale
        */
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
            // y: 1,
        };

        
        if (! hasOrigin) this.shoot = {
            dX:  Math.round(dX * pivot.h),
            dY:  Math.round(dY * pivot.v),
            scale: scale.x,
            rotate: rotate,
            oX: Math.round(dX * pivot.h) * scale.x,
            oY: Math.round(dY * pivot.v) * scale.x,
        };


        const trO = rotatePoint(
            // this.shoot.oX, 
            // this.shoot.oY, 
            this.shoot.dX, 
            this.shoot.dY, 
            0, 0, 
            this.shoot.dX, 
            this.shoot.dY, 
            this.shoot.rotate,
            scale.x
            );

        const tr = {
            dX:  Math.round(dX * pivot.h),
            dY:  Math.round(dY * pivot.v)
        };
        const trB = {
            dX: this.shoot.oX, 
            dY: this.shoot.oY, 
        }
        // const translate = hasOrigin ? trO : tr;
        // const translate = hasOrigin ? this.shoot : tr;
        // const translate = hasOrigin ? trB : tr;
        const translate =  {dX, dY};

        this.origin = {
            // oX: (width * 0.5)  - (trO.dX * hasOrigin),
            // oY: (height * 0.5) - (trO.dY * hasOrigin),
            // oX: (width * 0.5)  - (trB.dX * hasOrigin),
            // oY: (height * 0.5) - (trB.dY * hasOrigin),
            // oX: (width * 0.5)  - (this.shoot.oX * hasOrigin),
            // oY: (height * 0.5) - (this.shoot.oY * hasOrigin),
            oX: (width * 0.5) ,
            oY: (height * 0.5) 
        };
      
        const {origin} = this;

        const oX = Math.round(origin.oX *100) /100;
        const oY = Math.round(origin.oY *100) /100;
        const ddX = Math.round(translate.dX *100) /100;
        const ddY = Math.round(translate.dY *100) /100;
        console.log('origin', oX, oY );
        console.log('translate', ddX, ddY );


        return this.callback({
            rendu: {
                translate, 
                rotate, 
                scale, 
                origin
            }
        });

    }
}


       
//    x' = cos(theta)*(x-xc) - sin(theta)*(y-yc) + xc
//    y' = sin(theta)*(x-xc) + cos(theta)*(y-yc) + yc

// eslint-disable-next-line
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


