export default function (image) {
    const canvas = makeCanvasFromImage(image);
    const proxy = convertCanvasToImage(canvas);
    // console.log('proxy',proxy);
    return {
        image, 
        /*
        proxy
        */
        proxy: {
            src: proxy.src, 
            width: proxy.width, 
            height: proxy.height
        }
    } 
}

function convertCanvasToImage(canvas) {
	const image = new Image();
	image.src = canvas.toDataURL("image/jpeg", 0.7);
	return image;
}

function makeCanvasFromImage(image) {
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

// Le grand coté du proxy fait 1000px
function sizeCanvas(width, height, cible = 1000) {
    const ratio = (width/height > 1);
    return {
        width: ratio ? cible : width * (cible/height),
        height: ratio ? height * (cible/width) : cible
    }   
}
