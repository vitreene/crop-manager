// create, read, update 
// import {DONE} from '../config/constantes'
import getImage from './image'
import makeProxy from './proxy'
// import makeCropper from './cropper'
import creerCadrage from './cadrage'
import initTransform from './transform'
import {translateEnPixels} from '../helpers/translate-pc-px'


export default class ManagerLib {
    image = null
    proxy = null
    transform = null
    cadrage = null
    // cadre = null
    pristine = false // l'objet a-t-il été modifié ?

    // create object
    create(src, ratio ) {
        return getImage(src)
        .then( image => makeProxy(image) )
        .then(( {image, proxy}) => {
            // construire l’objet à partir de l’image
            // -> proxy, si pas de proxy, utiliser la hd.
            // -> crop,
            // -> transform            
            this.cadrage = creerCadrage(ratio, image);
            this.transform = initTransform(this.cadrage, image);
            this.image = image;
            this.proxy = proxy;
            this.pristine = false;            

            return ( this.read() );
        })
    }
    update(transform) {
        this.transform = transform;
        this.pristine = false; 
    }

    updateCadre(ratio) {
        if (!this.cadrage) return;
        this.cadrage.ratio = ratio;
        this.pristine = false; 
    }

    read() {
        const {proxy, cadrage, transform} = this;
        return {proxy, cadrage, transform}
    }

    importer(obj) {
        const {image: {src}, cadrage,/* cadre, */ transform} = obj;
        console.log('import image', obj);
        return getImage(src)
        .then( image => makeProxy(image) )
        .then( ({image, proxy}) => {            
            this.image = image;
            this.cadrage = creerCadrage(cadrage.ratio, image);
            this.proxy = proxy;
            this.transform = transform;
            this.pristine = true;
            // console.log('this.importer', this);
           return ( this.read() );            
        })
    }
    exporter(){
        const {image, cadrage, transform} = this;
        if (!image || !cadrage || !transform) return;
        return {
            image: {
                src: image.src,
                width: image.naturalWidth,
                height: image.naturalHeight
            },
            proxy: this.proxy,
            // "preset": "p4x3",
            cadrage: {
                diagonale: cadrage.diagonale,
                ratio: cadrage.ratio
            },
            transform: transform,
            // sera un tableau de cadres
            // cadre: this.cadre || {width: 0, height: 0},
            meta: {pristine: this.pristine}
        }
    }

    rendu(rendu) {
        const {width, height} = rendu;
        // si w ou h   = 0, utiliser placeholder
        // {width, height}
        /*
        if (!rendu.width && !rendu.height) {
            rendu.width = cadreDefaults.width;
            rendu.height = cadreDefaults.width / ratio 
        } else if (!rendu.width) {
            rendu.width = rendu.height * ratio
        } else if (!dims.height) {
            rendu.height = rendu.width / ratio 
        }
*/
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

        // this.cadre = {width, height};
        
        const {image, cadrage, transform} = this;
        if (!image || !cadrage || !transform) return;
        
        const {dX, dY} = transform.translate;
        const {pivot} = transform;
        const {diagonale} = cadrage;

        // "180 + transform.rotate" dans le rendu Canvas, pourquoi ?
        // résolu, il fallait d'abord appliquer rotate avant scale.
         const rotate = ((pivot.h + pivot.v) === 0) 
            ? 180 - transform.rotate
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

        const position = {
            w: (width - image.width) / 2 + translate.dX,
            h: (height - image.height) / 2 + translate.dY
        }

        return {
            rendu: {
                cadre: {width, height},
                position,
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
