/* eslint-disable */
import defaults from '../config/instance-init'

import transformer from '../helpers/transformer'
import {setCropWrapper, setCropper} from '../helpers/cropper-size'
import proxySize from '../helpers/proxy-size'

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
        const cropSize = this.cropResize(cadrage);
        this.imageResize(proxy, cadrage, cropSize);
        this.loading = false;
    }
    updatePosition(manip){
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
    }

    resize(conteneur, cadrage, proxy) {
        this.conteneur = conteneur;
        const size = conteneur.containerSize;
        if (this.loading) return false;
        const cropSize = this.cropResize(cadrage, size);
        this.imageResize(proxy, cadrage, cropSize);

    }
    cropResize(cadrage, size = this.conteneur.containerSize) {
        this.cropWrapper = setCropWrapper(size, cadrage);
        this.cropper = setCropper(this.cropWrapper, cadrage);
        return this.cropper;
    }

    imageResize(proxy, cadrage, cropper) {
        const dims = proxySize(cadrage, cropper);
        this.proxy = Object.assign( 
            {},
             dims,
            {src: proxy.src}
        );
    }
    translateResize(){
        // mettre à l'echelle la translation
    }

    pivoter(h,v){
        // transformer true/false en (-1)/(+1) (true = checked)
        this.pivot = {
            h: h ? -1 : 1,
            v: v ? -1 : 1,
        };
        console.log('PIVOT', this.pivot);
        
        // this.updateRendu();
        // this.sendPosition(DONE);
    }
    
}



function translateEnPourcents({dX, dY}, {width, height}) {
    console.log('translateEnPourcents', dX, width);
    
    return {
        dX: dX ? width / dX : dX,
        dY: dY ? height / dY : dY
    } ;
}

function translateEnPixels({dX, dY}, {width, height}) {

    return {
        dX: width * dX,
        dY: height * dY
    } ;
}
