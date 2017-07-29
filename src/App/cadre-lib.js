// optimiser:  passer en functionnel.

/*
Gere la saisie des valeurs du cadre

    entrées :
    - inputs : width, height, ratio, permuter
    - import : [ width ], [ height ] , ratio
    - manip: ratio
    valeurs par défaut pour placeholder
    presets ratio ?

    sortie :
    - width, height,  
    - placeholder width et height,  
    - ratio : nom et valeur
    - orientation : horizontal / vertical ? -> pour afficher une icone
    presets ? 
*/


/*
    deux étapes : saisie et blur.
    saisie = synchro cadre et placeholder pas de synchro avec le ratio des aspects
    blur :
    - validation min et max, alerte si dépassement
    - export ratio pour aspect et pour crop-manager.

    import = blur.
    ratio: : 
    - w ou h n'est pas renseigné -> saisie + blur
    - w et h sont renseignés : 
            - soit ratio est inopérant,
            - soit h est modifié + alerte,
    - ni w ni h sont rensignés = valeurs par defaut.
*/
import{presets, cadreDefaults} from './config/initial'

const cadreEmpty =  {
    width: '',
    height: '',
    ratio: 1.5, 
    seuil: false
}
/*
const quelName = {
    width: 'height',
    height: 'width',
    ratio: ''
}
*/
// idéalement, la limite supérieure est calculée sur le poids maximum accepté par ios (5Mo)
// const maxFileSize = 5 * 1024 * 1024;
// const minFileSize = 10 * 10;

const fileSize = {
        min: 10, // dimension minimum
        max: 5 * 1024 * 1024 // surface maximum 5 242 880px
};
            
export default function CadreLib(){
    let cadre = {...cadreEmpty};
    let placeholder = {...cadreDefaults};
    
    function inputs(inputs, state) {
        // accepte un objet de type {name, value}
        // ou bien {width, height, ratio}   
        const profil = Object.keys(inputs).length;
        const name = (profil === 2) ? inputs.name : 'cadre';  
        const value = (profil === 2) ? inputs.value : inputs ; 

        switch (name) {
            case 'cadre':
                console.log('cadre', value);
                return importer(value)
                // break;
            case 'permute':
                console.log('permute');
                return _permute(state);                
                // break;
        
            case 'select':
                return _ratioChange(Number(value), state);
                // break;
        
            default:
                return _dims({name, value: Number(value)}, state)
                // break;
        }
    }
    function _ratioChange(ratio, state) {
        // forcer la hauteur si nouveau ratio.
        // const {width, height} = state;
        const cadre = {
            width: state.width,
            height: (notZero(state.width) && notZero(state.height)) 
                ? state.width / ratio
                : state.height,
            ratio
        }

        const placeholder = dimensions(cadre, cadreDefaults);
        const res =  Object.assign( {},
            state,
            cadre,
            {placeholder},
            {select: _findOptions(placeholder.absRatio)}
        );
        console.log('_ratioChange', res);
        return res;
    }

    // @params: target-name, 
    // @params: valeur
    // @params: prev-state
    function _dims({name, value}, state) {
        const {width, height, ratio} = state;

        const cadre = {
            width, 
            height, 
            ratio: null,
            [name]: notZero( value ) ? value : ''
        };
        cadre.ratio = updateRatio(cadre.width, cadre.height, ratio);
        // console.log('cadre_dims', cadre);
        // console.log('value', value, notZero(value) );
        
        const placeholder = dimensions(cadre, cadreDefaults);
        const res =  Object.assign( {},
            state,
            cadre,
            {placeholder},
            {select: _findOptions(placeholder.absRatio)}
        );
        console.log('_dims', res);
        return res;
    }

    function _permute(state) {
        const {width, height, ratio} = state;
        const cadre = {
            width: height,
            height: width,
            ratio: 1 / ratio
        };

        const placeholder = dimensions(cadre, cadreDefaults);
        const res =  Object.assign( {},
            state,
            cadre,
            {placeholder},
            {select: _findOptions(placeholder.absRatio)}
        );
        console.log('_permute', res);
        return res;
    }

    function _findOptions(v) {
        const value = arrondi(v);
        //verifier si absRatio est présent dans la liste
        // sinon, attribuer à 'libre'
        const find = presets
            .map( p => p.ratio)
            .findIndex( (ratio) => {
                return arrondi(ratio) === value} );
        
        const select = (find > 0) ? find : 0;
        const libre = (find === -1)
        ? [{name: 'libre', ratio: value}]
        : [];

        const options = libre.concat(presets);

        return {
                selected: options[select].ratio,
                presets: options
        }
    }

    function importer(inputs, state) {
        cadre = {...cadreEmpty};
        cadre.ratio = inputs.ratio;

        const placeholder = dimensions(inputs, cadreDefaults);
        const res =  Object.assign( {},
            state,
            cadre,
            {placeholder},
            {select: _findOptions(placeholder.absRatio)}
        );
        console.log('cadre-lib : importer', res);
        return res;        
    }

    function init() {
        // valeurs par défaut
        cadre = {...cadreEmpty};
        placeholder = {...cadreDefaults};
        // return rendu();

        return {
            ...cadreEmpty,
            placeholder: {...cadreDefaults},
            select: _findOptions(cadreDefaults.absRatio)
        }

    }

    // XXX
    function _prerendu({width, height}, obj) {
        
        return Object.assign({}, obj, ...limit(width, height))
    }
    /*
    */
    function validate(state) {
        const {width, height , ratio} = state;

        const cadreLimits = limit(width, height);
        cadreLimits.ratio = ratio;
        console.log('cadreLimits', cadreLimits);
        const placeholder = dimensions(cadreLimits, cadreDefaults);
        console.log('placeholder', placeholder);
        
        /*
        const placeholderLimits = limit(placeholder.width, placeholder.height);
        console.log('placeholderLimits', placeholderLimits);
        */
        const res =  Object.assign( {},
            state,
            cadreLimits,
            {placeholder},
            {select: _findOptions(placeholder.absRatio)}
        );
        console.log('validate', res);
        return res;
    }

    // XXX
    function rendu() {
        return {
            // width:  Math.round(cadre.width),
            // height:  Math.round(cadre.height),
            // ratio: cadre.ratio,
            ...cadre,
            placeholder,
            // plWidth:  Math.round(placeholder.width),
            // plHeight:  Math.round(placeholder.height),
            // absRatio: placeholder.absRatio,
            // portrait: placeholder.portrait,
            select: _findOptions(placeholder.absRatio)
        }        
    }

    return {
        init,
        importer,
        inputs,
        validate
    }
}


function arrondi(value, precision = 2) {
    const multi = Number('1e' + precision);
    return Math.floor(value * multi) / multi; 
}

// controle si w x h depasse le seuil; 
// dans ce cas, renvoie la valeur limite en respectant le ratio
// avec un flag indiquant si le seuil a été atteint
export function limit(ww,hh) {

    /*
    si ww = 0 -> ''
    si ww = '' 
    */
    const hasWidth = notZero(ww); 
    const hasHeight = notZero(hh); 
    const res = {
        width: ww,
        height: hh,
        seuil: false,
        // ratio: null
    };
/*
    if (!ww || !hh) {
        res.seuil = true;
        return res
    }
*/
    const w = hasWidth ? ww : 1;
    const h = hasHeight ? hh : 1;
    // console.log('w', w, 'h', h, (!w || !h) ) ;

    const size = w * h ;
    const ratio = w / h;
    const widthMax = Math.sqrt( ratio ) * Math.sqrt(fileSize.max);

    if (size > fileSize.max) {
        res.width = hasWidth ? Math.floor(widthMax) : '';
        res.height = hasHeight ? Math.floor(widthMax / ratio) : '';
        res.seuil = true;
    }
    
    // le coté le plus petit = min 
    // ratio < 1  = w / h < 1 = w est le petit coté
    if (size < (fileSize.min * fileSize.min)) {
        res.width = hasWidth
        ? Math.floor(
            (ratio < 1) ? fileSize.min : fileSize.min * ratio
        )
        : '';
        res.height = hasHeight
        ? Math.floor(
            (ratio < 1) ? fileSize.min / ratio : fileSize.min
        )
        : '';
        res.seuil = true;
    }
    return res
}

// retourne les trois valeurs et compense l'absence éventuelle en entrée.
export function dimensions(dim, defaut) {
    // const width =  height, ratio}
    const res = {...dim};
    // const {width, height, ratio} = dim;
    // const missingKeys = missingValues({width, height, ratio});
    const missingKeys = missingValues(dim);
    console.log('missingKeys', missingKeys);

    // switch (missingValues({width, height, ratio})) {
    switch (missingKeys) {
        case 'width':
            res.width = dim.height * dim.ratio
            break;
    
        case 'height':
            res.height = Math.floor(dim.width / dim.ratio);         
            break;
    
        case 'height width':
            res.width = defaut.width;
            res.height = Math.floor(defaut.width / dim.ratio);
            break;

        case 'ratio': 
            res.ratio = dim.width / dim.height;
            break;
    
        case 'height ratio': 
            res.height = dim.width * defaut.ratio;
            res.ratio = defaut.ratio;
            break;

        case 'ratio width':
            res.width = Math.floor(dim.height / defaut.ratio);
            res.ratio = defaut.ratio;
            break;
    
        case 'height ratio width':
            res.width = defaut.width;
            res.height = defaut.height;
            res.ratio = defaut.ratio;        
            break;
    
        default:
            res.ratio = dim.width / dim.height;
            break;
    }

    return {
        ...res, 
        ...absRatio(res.ratio)
    };
}

// liste les termes manquants
export function missingValues(arr, liste = ['width', 'height', 'ratio']) {
    return liste
    .sort()
    .reduce( (missing, key) =>  
        missing + ( !arr[key] ? ' ' + key : '' ), 
    '' )
    .trim();
}

export function absRatio(ratio) {
    return {
        absRatio: arrondi( (ratio < 1) ? (1 / ratio) : ratio ),
        portrait: (ratio < 1)
    }
}

// test si value est un nombre différent de zéro
export function notZero(value) {
    return  (typeof(value) === 'number' && !!value)
    /*
    return !(
        value === null ||
        value === undefined ||
        value === ''
    )
    */
}

function updateRatio(width, height, ratio) {
    const canRatio = ( notZero(width) && notZero(height) );
    return canRatio ? width / height : ratio;
}