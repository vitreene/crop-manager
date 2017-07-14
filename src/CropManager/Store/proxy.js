export default async function (image) {
    const canvas = makeCanvasImage(image);
    return new Promise( resolve => {
        canvas.toBlob( blob => resolve({
            image, 
            proxy: {
                src: window.URL.createObjectURL(blob), 
                width: canvas.width, 
                height: canvas.height
            }
        })
        )
    });   
}

function makeCanvasImage(image) {
    const canvas = makeCanvas(image.width, image.height);
    canvas
    .getContext('2d')
    .drawImage(image, 0,0, canvas.width, canvas.height);
    return canvas;
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
