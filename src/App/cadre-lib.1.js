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
import{presets, cadreDefaults} from './config/initial'

const cadreEmpty =  {
    width: '',
    height: '',
    ratio: 1.5, 
    seuil: false
}

const quelName = {
    width: 'height',
    height: 'width',
    ratio: ''
}

// idéalemenbt, la limite supérieure est calculée sur le poids maximum accepté par ios (5Mo)
// const maxFileSize = 5 * 1024 * 1024;
// const minFileSize = 10 * 10;

const fileSize = {
        min: 10, // dimension minimum
        max: 5 * 1024 * 1024 // surface maximum
};
            
export default function CadreLib(){
    let cadre = {...cadreEmpty};
    let placeholder = {...cadreDefaults};
    
    function inputs(inputs) {
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
                return _permute();                
                // break;
        
            case 'select':
                return _ratioChange(value);
                // break;
        
            default:
                return _dims({name, value})
                // break;
        }
    }
    function _ratioChange(ratio) {
        // si w ou h existe
        if (!cadre.width && !cadre.height) {
            placeholder.height = placeholder.width / ratio;
        }

        if (!cadre.width && cadre.height) {
            placeholder.width = cadre.height * ratio;
            placeholder.height = cadre.height
        }
        
        if (cadre.width && !cadre.height) {
            placeholder.width = cadre.width;
            placeholder.height = cadre.width / ratio;
        }
        

        if (cadre.width && cadre.height) {
            placeholder.width = cadre.width;
            placeholder.height = cadre.width / ratio;
            cadre.height = cadre.width / ratio;
        }

        cadre.ratio = ratio;
        placeholder.absRatio = (ratio < 1 ) ? (1 / ratio) : ratio;
        placeholder.portrait = (ratio < 1);

        return rendu();
    }

    // params: target-name, valeur
    function _dims({name, value}) {
        // console.log('_dims', name, value);
        
        const altName = quelName[name];

        // valider limites 
        // cadre = _prerendu({[name]:value, [altName]: cadre[altName]}, cadre);
        
        cadre[name] = (value < 1) ? '' : value;
                
        if ( cadre[name] && cadre[altName] ) {
           cadre.ratio = cadre.width / cadre.height;
        }
        
        const quotient = (name === 'width') 
            ? 1 / cadre.ratio 
            : cadre.ratio;

        placeholder[name] = cadre[name] 
            || Math.floor(cadre[altName] / quotient)
            || cadreDefaults[name];

        placeholder[altName] = cadre[altName] 
            || Math.floor(cadre[name] * quotient)
            || cadreDefaults[altName];
    
        placeholder.absRatio = arrondi(
            (cadre.ratio < 1) 
            ? 1 / cadre.ratio
            : cadre.ratio
        );
        placeholder.portrait = (cadre.ratio < 1);
        // verifier si c'est un preset

        return rendu();
    }

    function _permute() {
        const {width, height, ratio} = cadre;
        cadre = {
            width: height,
            height: width,
            ratio: 1/ ratio
        }
        const {width: w, height: h, /*absRatio: r,*/ portrait} = placeholder;
        placeholder = {
            width: h,
            height: w,
            absRatio: (ratio < 1 ) ? (1 / ratio) : ratio,
            portrait: !portrait
        }
        return rendu();
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

    function importer(inputs) {
        // params = {width, height, ratio}
        const {ratio, ...dims} = inputs;

        // !!! fusionner les tests avec _ratioChange
        // si valeurs nulles, valeurs par défaut
        if (!dims.width && !dims.height) {
            dims.width = cadreDefaults.width;
            dims.height = cadreDefaults.width / ratio 
        } else if (!dims.width) {
            dims.width = dims.height * ratio
        } else if (!dims.height) {
            dims.height = dims.width / ratio 
        }

        cadre = {...cadreEmpty};
        cadre.ratio = ratio;
        placeholder = {
            ...dims,
            absRatio: ratio,
            portrait: (ratio <1)
        };
        return rendu();
    }

    function ratio() {
        return {ratio: cadre.ratio} ;
    }
    
    function init() {
        // valeurs par défaut
        cadre = {...cadreEmpty};
        placeholder = {...cadreDefaults};
        return rendu();
    }

    function _prerendu({width, height}, obj) {
        
        return Object.assign({}, obj, ...limit(width, height))
    }
/*
*/
    function validate() {
        // verifier d'abord si les valeurs existent, sinon employer ratio ou défaut.
        // verifier si les valeurs individuelles sont inférieures à la limite
        const cadreLimits = limit(cadre.width, cadre.height);
        const placeholderLimits = limit(placeholder.width, placeholder.height);
        console.log('cadreLimits', cadreLimits);
        console.log('placeholderLimits', placeholderLimits);
        
        cadre = Object.assign({}, {...cadre}, {...cadreLimits});
        placeholder = Object.assign({}, {...placeholder}, {...placeholderLimits});
        return rendu();
    }

    function rendu() {
        return {
            // width:  Math.round(cadre.width),
            // height:  Math.round(cadre.height),
            // ratio: cadre.ratio,
            ...cadre,
            plWidth:  Math.round(placeholder.width),
            plHeight:  Math.round(placeholder.height),
            absRatio: placeholder.absRatio,
            portrait: placeholder.portrait,
            select: _findOptions(placeholder.absRatio)
        }        
    }

    return {
        inputs,
        importer,
        ratio, 
        init,
        validate
    }
}


function arrondi(value, precision = 2) {
    const multi = Number('1e' + precision);
    return Math.floor(value * multi) / multi; 
}

// controle si w x h depasse le seuil; 
// dans ce cas, renvoie la valeur limite en respectant le ratio
// avec un flag indiqant si le seuil a été atteint

export function limit(w,h) {
    const res = {
        width: w,
        height: h,
        seuil: false
    };
// console.log('w', w, 'h', h, (!w || !h) ) ;

    if (!w || !h) {
        res.seuil = true;
        return res
    }

    const size = w * h ;
    const ratio = w / h;
    const widthMax = Math.sqrt( ratio ) * Math.sqrt(fileSize.max);

    if (size > fileSize.max) {
        res.width = Math.floor(widthMax);
        res.height = Math.floor(widthMax / ratio);
        res.seuil = true
    }
    
    // le coté le plus petit = min 
    // ratio < 1  = w / h < 1 = w est le petit coté
    if (size < (fileSize.min * fileSize.min)) {
        res.width = Math.floor(
            (ratio < 1) ? fileSize.min : fileSize.min * ratio
        );
        res.height = Math.floor(
            (ratio < 1) ? fileSize.min / ratio : fileSize.min
        );
        res.seuil = true
    }

    return res
}

// retourne les trois valeurs et compense l'absence éventuelle en entrée.
export function dimensions(dim, defaut) {
    // const width =  height, ratio}
    const res = {...dim};
    // const missingKeys = missingValues(dim);

    switch (missingValues(dim)) {
        case 'width':
            res.width = dim.height * dim.ratio
            break;
    
        case 'height':
            res.height = dim.width / dim.ratio         
            break;
    
        case 'height width':
            res.width = defaut.width;
            res.height = defaut.width / dim.ratio ;
            break;

        case 'ratio': 
            res.ratio = dim.width / dim.height;
            break;
    
        case 'height ratio': 
            res.height = dim.width * defaut.ratio;
            res.ratio = defaut.ratio;
            break;

        case 'ratio width':
            res.width = dim.height / defaut.ratio;
            res.ratio = defaut.ratio;
            break;
    
        case 'height ratio width':
            res.width = defaut.width;
            res.height = defaut.height;
            res.ratio = defaut.ratio;        
            break;
    
        default:
            break;
    }
    return res;
}

// liste les termes manquants
export function missingValues(arr) {
    return Object.keys(arr)
    .sort()
    .reduce( (missing, key) =>  
        missing + ( !arr[key] ? ' ' + key : '' ), 
    '' )
    .trim();
}