
export function translateEnPourcents({dX, dY}, {w, h}) {
    // console.log('translateEnPourcents', dX, w, dY, h);
    
    return {
        dX: dX && (dX / w) || 0,
        dY: dY && (dY / h) || 0
    } ;
}

export function translateEnPixels({dX, dY}, {w, h}) {
    return {
        dX: w * dX,
        dY: h * dY
    } ;
}