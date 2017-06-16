// create, read, update 
import {DONE} from '../config/constantes'
import getImage from './image'
import makeProxy from './proxy'
// import makeCropper from './cropper'
import creerCadrage from './cadrage'
import initTransform from './transform'
import {translateEnPixels} from '../helpers/translate-pc-px'


export default class {
        /*
    constructor(props) {
      Object.keys(defaults = {} ).map( 
          key => this[key] = props[key] || defaults[key]
          )
    }
          */
    proxy = {}
    image = {}
    cadrage = {}
    transform = {}

    // create object
    create(url, ratio ) {
        return getImage(url)
        .then( img => makeProxy(img) )
        .then(( {image, proxy}) => {
            this.cadrage = creerCadrage(ratio, image);
            this.transform = initTransform(this.cadrage, image);
            this.image = image;
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

    export(){
        //  retourner un objet comme initial.js
    }
    rendu(width, height) {
        // en entree : dimensions du canvas
        // -> données pour la sortie
        // image,
        // transform adapté

        /*
        comparer le ratio des dimensions à celui existant ;
        compenser au besoin.

        obtenir le tx d'agrandissement = 
        a = width / diagonale ;
        tx = a * scale

        obtenir le translate
        dX, dY * width

        */
        const rendu = {width, height};
        
        const {image, cadrage, transform} = this;
        const {dX, dY} = transform.translate;
        const {pivot} = transform;
        const {diagonale} = cadrage;

        // 180 - pour instance/rendu ?
         const rotate = ((pivot.h + pivot.v) === 0) 
            ? 180 + transform.rotate
            : transform.rotate;

        const scale = {
            x: (width / diagonale) * transform.scale * pivot.v, 
            y: (width / diagonale) * transform.scale * pivot.h
        };

        const translate = translateEnPixels(
            {dX: dX * pivot.h, dY: dY * pivot.v}, 
            {w: width}
        );

        return {
            rendu, 
            image, 
            transform: {
                translate, 
                rotate,
                scale
            }
        }
    }
}


        // console.log('image', image);
        // console.log('cadrage', cadrage);

        // console.log('transform', transform);