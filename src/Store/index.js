// create, read, update 
import {DONE} from '../config/constantes'
import getImage from './image'
import makeProxy from './proxy'
// import makeCropper from './cropper'
import creerCadrage from './cadrage'
import initTransform from './transform'
import {translateEnPixels} from '../helpers/translate-pc-px'


export default class {
    proxy = null
    image = null
    cadrage = null
    // cadre = {}
    transform = null

    // create object
    create(src, ratio ) {
        return getImage(src)
        .then( img => makeProxy(img) )
        .then(( {image, proxy}) => {
            // construire l’objet à partir de l’image
            // -> proxy, si pas de proxy, utiliser la hd.
            // -> crop,
            // -> transform            
            this.cadrage = creerCadrage(ratio, image);
            this.transform = initTransform(this.cadrage, image);
            this.image = image;
            this.proxy = proxy;

            return ( {action: DONE });
        })
    }
    update(params) {
        this.transform = params;
    }

    updateCadre(ratio) {
        this.cadrage.ratio = ratio;
    }

    read() {
        const {proxy, cadrage, transform} = this;
        return {proxy, cadrage, transform}
    }

    export(){
        //  retourner un objet comme initial.js
    }
    rendu({width, height}) {
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

        ? performance ? 
        selon l'echelle, il suffit d'envoyer le proxy à la place de l'original.
        */
        const cadre = {width, height};
        
        const {image, cadrage, transform} = this;
        const {dX, dY} = transform.translate;
        const {pivot} = transform;
        const {diagonale} = cadrage;

        // "180 - transform.rotate" dans instance/rendu, pourquoi ?
         const rotate = ((pivot.h + pivot.v) === 0) 
            ? 180 + transform.rotate
            : transform.rotate;

        const scale = {
            x: (width / diagonale) * transform.scale * pivot.v, 
            y: (width / diagonale) * transform.scale * pivot.h
        };
        
        // console.log('scale', scale.x);
        
        const translate = translateEnPixels(
            {dX: dX * pivot.h, dY: dY * pivot.v}, 
            {w: width}
        );


        return {
            rendu: {
                cadre,
                image, 
                transform: {
                    translate, 
                    rotate,
                    scale
                }
            }
        }
    }
}