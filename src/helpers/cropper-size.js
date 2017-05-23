
export function setCropWrapper(size, crop) {
    if (!size) return;

    const {padding} = crop;
    const w = size.width * ((100 - (padding * 2)) / 100);
    const h = size.height * ((100 - (padding * 2)) / 100);

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
    
    const ratioW = crop.w / cropWrapper.w;
    const ratioH = (ratioW > 1) 
        ? crop.h / cropWrapper.h
        : cropWrapper.h / crop.h;
    const hZ = crop.h * (1 / ratioW);
    const wZ = crop.w * ratioH;

    const h = (hZ > cropWrapper.h)
        ? cropWrapper.h
        : hZ;
    const w = (hZ > cropWrapper.h)
        ? wZ
        : cropWrapper.w ;
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