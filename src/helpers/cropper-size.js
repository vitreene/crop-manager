
export function setCropWrapper(size, crop) {
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

export function setCropper(cropWrapper, crop) {  
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
