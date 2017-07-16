// import source from './img64-demo'

export const storage = {
  "image": {
    "src": process.env.PUBLIC_URL + '/vintage-travel-posters-1-20.jpg',
    "width": 3456, // pixels
    "height": 2304, // pixels      
    // eslint-disable-next-line
    // "src": source,
    // "width": 199,
    // "height": 180
  },
/*
  "proxy": {
    "src": "blob:http://localhost:3002/34071c94-998c-4367-8cad-e3bccef803ed",
    "width": 1000,
    "height": 904
  },
*/
  "cadrage": {
    "diagonale": 268.3300,
    "ratio": 0.8
  },
  "cadre": {
    "width": 320,
    // "height": 400,
    "height": 0,
    "ratio": 0.8
  },
  "transform": {
    "translate": {
      "dX": -0.1955,
      "dY": 0.1548
    },
    "rotate": 20,
    "scale": 4.3915,
    "pivot": {
      "h": 1,
      "v": 1
    }
  },
  "meta": {
    "pristine": false
  }
};


export const presets = {
    "p4x3": {
        ratio: 1.3333,
        name: "4:3",
    },
    "p3x2": {
        ratio: 1.5,
        name: "3:2",
    },
    "p5x7": {
        ratio: 0.7142,
        name: "5:7",
    },
    "p16x9": {
        ratio: 1.7777,
        name: "16:9",
    },
    "p1x1": {
        ratio: 1,
        name: "carré",
    },
}


export const cadreDefaults = {
    width: 160,
    height: 200,
    ratio: 0.8
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
    "cadrage": {
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
            "x": 0.10, // pourcents
            "y": 0.20 // pourcents
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
        "local-scale": 1 // ?
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

// eslint-disable-next-line
