/*
// taille du conteneur
 size : width, height
 cadrage : {
        diagonale, 
        ratio, 
        marge: PADDING, 
        image: {width, height} 
    }
*/
export function setCropWrapper(size, {marge}) {
    if (!size || marge > 49) return false;
    const sizeMin = Math.min(size.width, size.height);
    const padding = sizeMin * (marge/100) *2;
    const w = size.width - padding;
    const h = size.height - padding;

    const x = (size.width - w ) * 0.5;
    const y = (size.height - h) * 0.5;
    
    return {
        x,
        y,
        w,
        h,
    }
}


export function setCropper(cropWrapper, cadrage) {  
    if (!(cadrage.diagonale && cadrage.ratio)) return false;
    const cw = cadrage.diagonale;
    const ch = cw/ cadrage.ratio;
    const wZ = cw / (ch / cropWrapper.h);
    const hZ = ch * (cropWrapper.w / cw); 

    const h = (hZ > cropWrapper.h) 
        ? cropWrapper.h
        : hZ;

    const w = (hZ > cropWrapper.h) 
        ? wZ
        : cropWrapper.w;

    const x = (cropWrapper.w - w) * 0.5;
    const y = (cropWrapper.h - h) * 0.5;
    // const echelle = w / cw ;

    return {
        x,
        y,
        w,
        h,
        // echelle
    }
}


/*
export function ZsetCropWrapper(size, crop) {
    if (!size || crop.padding > 49) return false;
    const sizeMin = Math.min(size.width, size.height);
    const padding = sizeMin * (crop.padding/100) *2;
    const w = size.width - padding;
    const h = size.height - padding;

    const x = (size.width - w ) * 0.5;
    const y = (size.height - h) * 0.5;
    
    return {
        x,
        y,
        w,
        h,
    }
}

export function ZsetCropper(cropWrapper, crop) {  
    if (!(crop.w && crop.h && cropWrapper.w && cropWrapper.h)) return false;
    const wZ = crop.w / (crop.h / cropWrapper.h);
    const hZ = crop.h * (cropWrapper.w / crop.w); 

    const h = (hZ > cropWrapper.h) 
        ? cropWrapper.h
        : hZ;

    const w = (hZ > cropWrapper.h) 
        ? wZ
        : cropWrapper.w;

    const x = (cropWrapper.w - w) * 0.5;
    const y = (cropWrapper.h - h) * 0.5;
    const ratio = w / crop.w ;

    return {
        x,
        y,
        w,
        h,
        ratio
    }
}

// version de test
export function XXsetCropper(cropWrapper, crop) {
    let h, w;
    const ratioW = crop.w / cropWrapper.w; //1,02
    w = cropWrapper.w;  // crop.w * (cropWrapper.w / crop.w)
    h = crop.h * (1/ratioW); // 
    
    // crop plus grand qe conteneur
    if (ratioW >1) { 
        if (h > cropWrapper.h) {
            h = cropWrapper.h;
            w = crop.w / (crop.h/cropWrapper.h)
        }
    }
    // crop plus petit que conteneur
    else {
        if (h > cropWrapper.h) {
            h = cropWrapper.h;
            w = crop.w * (cropWrapper.h/crop.h)
        }
    }
    
    const x = (cropWrapper.w - w) * 0.5;
    const y = (cropWrapper.h - h) * 0.5;

    const ratio = w / crop.w ;
    return {
        x,
        y,
        w,
        h,
        ratio
    }
}
*/