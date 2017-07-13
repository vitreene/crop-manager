// eslint-disable-next-line
import pica from 'pica/dist/pica.min.js'

export default async function (image) {
    const {width: naturalWidth, height: naturalHeight} = image;
    const options = {
        unsharpAmount: 70,
        unsharpRadius: 0.6,
    }
    const canvas = makeCanvas(naturalWidth, naturalHeight);
    const resizer = new pica();
    let proxy = await resizer.resize(image, canvas, options);
        proxy = await resizer.toBlob(proxy, 'image/jpeg', 70);
    return {
        image, 
        proxy: {
            src: window.URL.createObjectURL(proxy), 
            width: canvas.width, 
            height: canvas.height
        }
    };
     
}

function makeCanvas(width, height) {
    const size = sizeCanvas(width, height);    
    const canvas = document.createElement('canvas');
    canvas.width = size.width;
    canvas.height = size.height;
    return canvas;
}

function sizeCanvas(width, height, cible = 1000) {
    const ratio = (width/height > 1);
    return {
        width: ratio ? cible : width * (cible/height),
        height: ratio ? height * (cible/width) : cible
    }   
}
