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
    ratio: 1.5
}

const quelName = {
    width: 'height',
    height: 'width',
    ratio: ''
}
            
export default function cadreLib(){
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
                break;
            case 'permute':
                console.log('permute');
                return _permute();                
                break;
        
            case 'select':
                return _ratioChange(value);
                break;
        
            default:
                return _dims({name, value})
                break;
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
        placeholder.paysage = (ratio > 1);

        return rendu();
    }

    function _dims({name, value}) {
        // params: target-name, valeur
        const altName = quelName[name];
        const quotient = (name === 'width') 
        ? 1 / cadre.ratio 
        : cadre.ratio;

        /*
            si w est vide et h est vide
            -> rien : placeholders
            si w est rempli et h est vide
            -> w, h: placeholder
            si w est vide et h est rempli
            -> w: placeholder, h
            si w est rempli et h est rempli
            -> calculer ratio

        */
        
        placeholder[name] = Math.round(
            !!value ? value : cadreDefaults[name]
        );
        placeholder[altName] = Math.round(
            !!value ? value * quotient : cadreDefaults[altName] 
        );
        placeholder.absRatio = arrondi(placeholder.width / placeholder.height);
        placeholder.paysage = (placeholder.absRatio > 1)

        cadre[name] = Number(value);

        if ( cadre[name] && cadre[altName] ) {
           cadre.ratio = arrondi(cadre.width / cadre.height);
        // verifier si c'est un preset
        }
        return rendu();
    }

    function _permute() {
        const {width, height, ratio} = cadre;
        cadre = {
            width: height,
            height: width,
            ratio: 1/ ratio
        }
        const {width: w, height: h, /*absRatio: r,*/ paysage} = placeholder;
        placeholder = {
            width: h,
            height: w,
            absRatio: (ratio < 1 ) ? (1 / ratio) : ratio,
            paysage: !paysage
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
                const test = value === arrondi(ratio);
                console.log('select,', test, value, arrondi(ratio), ratio );
                return arrondi(ratio) === value} );
        
        const select = (find > 0) ? find : 0;
        const libre = (find === -1)
        ? [{name: 'libre', ratio: value}]
        : [];

        const options = libre.concat(presets);
console.log('options', libre, options);



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
            paysage: (ratio >1)
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

    function rendu() {
        return {
            // width:  Math.round(cadre.width),
            // height:  Math.round(cadre.height),
            // ratio: cadre.ratio,
            ...cadre,
            plWidth:  Math.round(placeholder.width),
            plHeight:  Math.round(placeholder.height),
            absRatio: placeholder.absRatio,
            paysage: placeholder.paysage,
            select: _findOptions(placeholder.absRatio)
        }        
    }

    return {
        inputs,
        importer,
        ratio, 
        init
    }
}


function arrondi(value, precision = 2) {
    const multi = Number('1e' + precision);
    return Math.floor(value * multi) / multi; 
}