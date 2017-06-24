
export const presets = {
    "p4x3": {
        ratio: 1.3333,
        name: "4:3",
    },
    "p15x10": {
        ratio: 1.5,
        name: "15:10",
    },
}


export const rendu = {
    translate: {dX: 0, dY: 0},
    rotate: 0,
    scale: 1,
    origin: {oX: 0, oY: 0},
};

export const cadreDefaults = {
    width: 160,
    height: 200,
    ratio: 0.8
};

export const modele = {
    cadrage: {
        diagonale: 1,
        image: {
            height:0,
            width: 0
        },
        marge: 5,
        ratio: 1
    },
    proxy: {
        width: 0,
        height: 0,
        src:""
    },
    transform: {
        pivot: {
            h: 1,
            v: 1
        },
        rotate: 0,
        scale: 1,
        translate: {
            dX: 0,
            dY: 0
        }
    }
};
    
const initial = {
    "image": {
        "src": process.env.PUBLIC_URL + '/vintage-travel-posters-1-20.jpg',
        // "src": process.env.PUBLIC_URL + '/DSC_0419.jpg',
        "naturalWidth": 3456, // pixels
        "naturalHeight": 2304, // pixels
        "ratio": 1.5
        },
    "proxy": {
        "id": 'proxy',
        "src": process.env.PUBLIC_URL + '/DSC_0419-proxy.jpg',
        "width": 1000, // pixels
        "height": 667 // pixels
    },
    "preset": "p4x3",
    "cropper": {
        "diagonale": 4153.5950,
        "ratio": 1.25,
        // padding : marge interieure en % entre le crop et le wrapper.
        "padding": 5 // pixels
    },
    "cadre": {
        "id": "1",
        "width": 400, // pixels
        "height": 300, // pixels
        "padding": 5 // pixels
    },
     "transform": {
        "id": "1",
        "translate": {
            "x": 10, // pourcents
            "y": 20 // pourcents
        },
        "rotation": 25, // degres
        "scale": 1.2,
        "pivot": {
            "v": 1, // ou booleen ?
            "h": 1
        }
    },
    "meta": {
        "pristine": true,
        "local-scale": 1
    }
}
export default initial


// eslint-disable-next-line
const manipModel = {
    "image": {
        "src": String,
        "naturalWidth": Number, // pixels
        "naturalHeight": Number // pixels
        },
    "proxy": {
        "id": String,
        "src": String,
        "width": Number, // pixels
        "height": Number // pixels
        },
    "crop": {
        "id": String,
        "width": Number, // pixels
        "height": Number, // pixels
        "padding": Number // pixels
    },
    "transform": {
        "id": String,
        "translate": {
            "x": Number, // pourcents
            "y": Number // pourcents
        },
        "rotation": Number, // degres
        "scale": Number,
        "pivot": {
            "v": Number, // ou booleen ?
            "h": Number
        }
    },
    "meta": {
        "pristine": Boolean,
        "local-scale": Number
    }
}
