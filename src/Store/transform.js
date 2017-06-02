export default function (cadrage, image) {
    const res = cover(cadrage, image);
    const scale = res.x;
    return {
        translate: {dX:0, dY:0},
        rotate: 0,
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

// deprecié
export function Xcover(cadrage, image, marge){
    // renvoie l'échelle nécessaire pour que l'image couvre entièrement le cadre et la marge.
    // image : width, height
    // cadrage : diagonale, ratio
    // marge : %;
    // sortie : echelle. 
    const {width, height} = image;
    const {diagonale, ratio} = cadrage;

    const d = diagonale + (diagonale * (marge /100)); 

    // image 3456 2304
    // cadrage 4153.59 4153.59 1.25    
    console.log('image', width, height);
    console.log('cadrage', diagonale, d, ratio);

    let h, w;
    w = d; 
    h = height * (d / width); 
    if (h < d / ratio) {  
        h = d / ratio;
        w = width * ((d / ratio) / height);

    }
    
    // cadrage = w: 4153, h: 3322 ratio = 1,25 = horizontal
    //   image = w: 6230, h: 4153 
    // devrait etre : image : w: 4983 h: 3322
    const scale = {
        diagonale,
        ratio,
        d,
        x: w / width, 
        y: h / height,
        w,
        h,
        width,
        height
    }

return scale;
}
