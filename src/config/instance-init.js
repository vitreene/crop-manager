const instance = {
    loading: true,
    hasOrigin: false,
    transform:  {
            translate: {dX: 0, dY: 0},
            rotate: 0,
            scale: 1,
        },
        origin: {oX: 0, oY: 0},
        pivot: {
            h: 1,
            v: 1
        },
        proxy: {
            // src: null,
            width: 0,
            height: 0
        },
        conteneur: {
            // dX: 0, dY: 0, width: 0, height: 0
            containerPos: {contDX: 0, contDY: 0}, 
            containerSize: {width: 0, height: 0},
        },
        cropWrapper: {
            x: 0, y: 0, w: 0, h: 0            
        },
        cropper: {
            x: 0, y: 0, w: 0, h: 0 , ratio: 1           
        },        
        // à séparer ?
        pointers: {
            pointer: {posX: 0, posY: 0},
            axe: {posX: 0, posY: 0},
        },
        action: null,
        device: null,
        message: ''
}

export default instance