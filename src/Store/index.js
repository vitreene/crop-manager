// create, read, update 
import {DONE} from '../config/constantes'
import getImage from './image'
import makeProxy from './proxy'
// import makeCropper from './cropper'
import creerCadrage from './cadrage'
import initTransform from './transform'

export default class {
        /*
    constructor(props) {
      Object.keys(defaults = {} ).map( 
          key => this[key] = props[key] || defaults[key]
          )
    }
          */
    proxy = {}
    cadrage = {}
    transform = {}

    // create object
    create(url, /*cadre*/ ratio ) {
        // image: src
        // cropper: w, h
        return getImage(url)
        .then( img => makeProxy(img) )
        .then(( {image, proxy}) => {
            // const cadrage = makeCropper(cadre, image);
            this.cadrage = creerCadrage(ratio, image);
            this.transform = initTransform(this.cadrage, image);
            this.proxy = proxy;
            // construire l’objet à partir de l’image
            // -> proxy, si pas de proxy, utiliser la hd.
            // -> crop,
            // -> transform            
            // return ({proxy, cadrage, transform});
            return ( {action: DONE });
        })
    }
    update(params) {
        // {translate, rotate, scale, pivot }
        this.transform = params;
    }
        
    // update Cropper
    // eslint-disable-next-line
    updateCropper(params) {
        
    }

    read() {
        const {proxy, cadrage, transform} = this;
        return {proxy, cadrage, transform}
    }
}

