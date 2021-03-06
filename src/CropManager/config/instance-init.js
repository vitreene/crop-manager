
const  initialState = { 
    options: {
        isLoading: true, // attention : géré par props.
        smooth: false
    },
    rendu: {
        translate: {dX: 0, dY: 0},
        rotate: 0,
        scale: {x: 1, y: 1}
    },
    // objets :
    pointers: [], 
    unit: {},
    // debut: {},
    // arrivee: {}, // garder la derniere position du pointeur

    message: '',
    action: '',

    start: {
        translate: {dX: 0, dY: 0},
        rotate: 0,
        scale: 1,
    },
    move: {
        translation: {dX: 0, dY: 0},
        rotation: 0,
        scalation: 1,
    },
    // export
    transform: { 
        translate: {dX: 0, dY: 0}, // pourcents
        translatePx: {dX: 0, dY: 0}, // pixels
        rotate: 0,
        scale: 1, // valeur
        pivot: {h: 1, v: 1}
    }, 

    conteneur: {},
    cropWrapper: {},
    cropper: {},
    
    cadrage: {},
    proxy: {}
};

export default initialState

/*
const instance = {
    isLoading: true,
    hasOrigin: false,
    callback: function fn() {},
    transform:  {
            translate: {dX: 0, dY: 0},
            rotate: 0,
            scale: 1,
            angle: 0,
            origin: {dX: 0, dY: 0},
        },
    translatePc: {dX: 0, dY: 0},
    origin: {oX: 0, oY: 0},
    pivot: {
        h: 1,
        v: 1
    },
    proxy: {
        src: null,
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
    cadrage : {
        diagonale: 1202,
        marge: 5,
        ratio: 1.3333,
        image: {
            height: 667,
            width: 1000
        },
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
*/