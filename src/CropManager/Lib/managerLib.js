// create, read, update 
import getImage from '../helpers/image'
import makeProxy from '../helpers/proxy'
import creerCadrage from '../helpers/cadrage'
import initTransform from '../helpers/transform'
import {translateEnPixels} from '../helpers/translate-pc-px'
import undoLib from './undoLib'
import {/*UNDO, REDO, */ DO, RAZ} from '../config/constantes'

const ManagerLib = {
    execute(action, donnees, state) {
        return this[action] && this[action](donnees, state);
    },

    async create(obj, state) {        
        const image = await getImage(obj.image);
        const proxy = await makeProxy(image);
        const ratio = obj.ratio || (obj.cadrage && obj.cadrage.ratio) || 1;
        const cadrage = creerCadrage(ratio, image);
        const newTransform = obj.transform || initTransform(cadrage, image);
        const transform = undoLib.execute(RAZ, newTransform)
        const commandes = this._canDO(transform);

        const nextState = {
            image,
            cadrage,
            transform,
            commandes,
            proxy,
            pristine: true      
        };
        
        return Object.assign(
            {},
            state,
            nextState
        )
    },

    update(transformer, state) {
        const transform = undoLib.execute(DO, transformer, state.transform);
        if (!transform) return state;
        const commandes = this._canDO(transform);

        const nextState = {
            transform,
            commandes,
            pristine: false      
        };
        // console.log('nextState', nextState);
        return Object.assign(
            {},
            state,
            nextState
        )
    },
    
    undoRedo(action, state) {
        const transform = undoLib.execute(action, state.transform);
        const commandes = this._canDO(transform);
        
        const nextState = {
            transform,
            commandes
        };
        
        return Object.assign(
            {},
            state,
            nextState
        )
    },

    _canDO(transform){
        return {
            canundo: !!transform.past.length,
            canredo: !!transform.future.length
        }
    },

    updateCadre(ratio, state) {
        if (!state.cadrage) return state;
        const nextState = {
            cadrage: {...state.cadrage, ratio},
            pristine: false      
        };
        return Object.assign(
            {},
            state,
            nextState
        )
    },
    
    exporter(state){
        const {image, cadrage, transform, proxy, pristine} = state;
        if (!image || !cadrage || !transform) return;
        const present = (transform && transform.present) || null;
        return {
            image: {
                src: image.src,
                width: image.naturalWidth,
                height: image.naturalHeight
            },
            proxy,
            cadrage: {
                diagonale: cadrage.diagonale,
                ratio: cadrage.ratio
            },
            // transform,
            transform: present,
            // sera un tableau de cadres
            // cadre: this.cadre || {width: 0, height: 0},
            meta: {pristine}
        }
    },

    rendu(rendu, state) {
        const {width, height} = rendu;
    /*
        obtenir le tx d'agrandissement = 
        a = width / diagonale ;
        tx = a * scale

        obtenir le translate
        dX, dY * width
    */    
        const {image, cadrage, transform: transformer} = state;
               
        if (!image || !cadrage || !transformer) return;
        const transform = transformer.present;
        
        const {dX, dY} = transform.translate;
        const {pivot} = transform;
        const {diagonale} = cadrage;

        const rotate = ((pivot.h + pivot.v) === 0) 
            ? 180 - transform.rotate
            : transform.rotate;

        const scale = {
            x: (width / diagonale) * transform.scale * pivot.v, 
            y: (width / diagonale) * transform.scale * pivot.h
        };

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

export default ManagerLib;