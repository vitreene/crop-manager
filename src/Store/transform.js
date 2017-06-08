export default function (cadrage, image) {
    const res = cover(cadrage, image);
    const scale = res.x;
    return {
        origin: {dX:0, dY:0},
        translate: {dX:50, dY:40},
        rotate: 25,
        scale
    }
}

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
