export default function (cadrage, image, preset = 'cover') {

    let res;

    switch (preset) {
        case 'cover':
            res = cover(cadrage, image); 
            break;
    
        case 'contains':
            res = contains(cadrage, image); 
            break;
    
        default:
            break;
    }

    // eslint-disable-next-line
    const scale = res.x;
    return {
        translate: {dX: 0, dY: 0},
        pivot: {h: 1, v: 1},
        rotate: 0,
        scale
    }
    // return {
    //     origin: {dX:0, dY:0},
    //     translate: {dX:125, dY:-45},
    //     rotate: 0,
    //     scale: 1
    // }
}

export function contains(cadrage, image){}


export function cover(cadrage, image){
    // renvoie l'échelle nécessaire pour que l'image couvre entièrement le cadre et la marge.
    // image : width, height
    // cadrage : diagonale, ratio
    // marge : %;
    // sortie : echelle. 
    const {width, height} = image;
    const {diagonale, ratio, marge} = cadrage;

    const d = diagonale + (diagonale * (marge /100)); 
    const wZ = d; 
    const hZ = height * (d / width); 

    const h = (hZ < d / ratio) ? d / ratio : hZ;
    const w = (hZ < d / ratio) ? width * ((d / ratio) / height) : wZ;
    const scale = {
        diagonale,
        ratio,
        d,
        x: w / width, // seule cette valeur est utile
        y: h / height,
        w,
        h,
        width,
        height
    }

return scale;
}
