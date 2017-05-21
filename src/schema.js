{
    "data": [
        {
            "type": "image",
            "attributes": {
                "src": String,
                "naturalWidth": Number,
                "naturalHeight": Number
            },
             "relationships": {
                  "crop": {
                      "id": String
                  },
                  "transform": {
                      "id": String
                  },
                  "proxy": {
                      "id": String
                  }
             }
        }
    ],

    "included": [
        {
            "type": "proxy",
            "id": String,
            "attributes": {
                "src": String,
                "width": Number,
                "height": Number
            }
        },
        {
            "type": "crop",
            "id": String,
            "attributes": {
                "width": Number,
                "height": Number
            }
        },
        {
            "type": "transform",
            "id": String,
            "attributes": {
                "translate": {
                    "x": Number,
                    "y": Number
                },
                "rotation": Number,
                "scale": Number,
                "pivot": {
                    "v": Number,
                    "h": Number
                }
            }
        }
        
    ],

    "meta": {
        "pristine": Boolean,
        "local-scale": Number
    }
}