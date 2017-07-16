/* eslint-disable */
import defaults from '../config/instance-init'
import {DONE} from '../config/constantes'

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
        };

        // const tr = {
        //     dX:  Math.round(dX * pivot.h),
        //     dY:  Math.round(dY * pivot.v)
        // };
        
        const translate = {
            // dX: Math.round(dX * pivot.h) * !hasOrigin,
            // dY: Math.round(dY * pivot.v) * !hasOrigin,
            dX:  Math.round(dX * pivot.h),
            dY:  Math.round(dY * pivot.v)
         };
        
        if (! hasOrigin) this.shoot = {
            scale: scale.x,
            dX:  Math.round(dX * pivot.h),
            dY:  Math.round(dY * pivot.v),
            rotate,
            oX: Math.round(dX * pivot.h) / scale.x,
            oY: Math.round(dY * pivot.v) / scale.x,
        };

        this.origin = {
            oX: (width * 0.5)  - (this.shoot.oX * hasOrigin),
            oY: (height * 0.5) - (this.shoot.oY * hasOrigin) 
            // oX: ((width/2)  - (tr.dX * scale.x  * hasOrigin)),
            // oY: ((height/2) - (tr.dY* scale.x * hasOrigin)) 
            // oX: width/2 - dec,
            // oY: height/2 - dec
        };
      
        const {origin} = this;

        // const oX = Math.round(origin.oX *100) /100;
        // const oY = Math.round(origin.oY *100) /100;

    //   console.log('origin', oX, oY );
    //   console.log('translate',translate.dX, translate.dY,tr.dX, tr.dY );
    //   console.log('proxy',width, height, scale.x, width*scale.x,  );
      // 624,416 // 437,291

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



/*
       
//    x' = cos(theta)*(x-xc) - sin(theta)*(y-yc) + xc
//    y' = sin(theta)*(x-xc) + cos(theta)*(y-yc) + yc

// eslint-disable-next-line
function rotation(cx, cy, x, y, angle) {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return{
        rX : (cos * (x - cx)) + (sin * (y - cy)) + cx,
        rY : (cos * (y - cy)) - (sin * (x - cx)) + cy
    }
}

*/