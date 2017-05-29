// create, read, update 
import pica from 'pica/dist/pica'

const manipImage = (function() {

    // create object
    const create = function(url, cropping = {} , callback ) {
        // image: src
        // cropper: w, h

        getImage(url)
        .then( img => makeProxy(img) )
        .then( proxy => {
            const cropper = makeCropper(cropping);
            const transform = initTransform();
            // construire l’objet à partir de l’image
            // -> proxy, si pas de proxy, utiliser la hd.
            // -> crop,
            // -> transform
            console.log('Proxy', proxy);
            
            callback(proxy);
        })
    }

return {create}
})()

export default manipImage

function getImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        // document.body.appendChild(image);
        image.onload = () => {
            // const img = {
            //     src: image.src,
            //     width: image.width,
            //     height: image.height
            // };
            // document.body.removeChild(image); 
            // resolve( img );
            resolve( image );
        };
        image.src = url;
        // image.style.position = "absolute";
        // image.style.opacity = 0;
        // image.style.pointers = 'none';      
    })
}

async function makeProxy(img) {
    
    const canvas = makeCanvas(img);
    const {image, width, height} = canvas;
    const options = {
        unsharpAmount: 70,
        unsharpRadius: 0.6,
    }
    const resizer = new pica();
    let proxy = await resizer.resize(img, image, options);
    proxy = await resizer.toBlob( proxy, 'image/jpeg', 70);
    const src = window.URL.createObjectURL(proxy);

// produit une image noire.

    return {src, width, height};
}

function makeCropper(cropper) {
    
}
function initTransform() {
    
}

function makeCanvas(image) {
    const {width, height} = image;
    const size = sizeCanvas(width, height);
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    return  {image: canvas, ...size};
}


function sizeCanvas(width, height, cible = 1000) {
    const ratio = (width/height > 1);
    return {
        width: ratio ? cible : width * (height/cible),
        height: ratio ? height * (width/cible) : cible
    }   
}