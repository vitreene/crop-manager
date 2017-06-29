export default function (src) {
    
    return new Promise(resolve => {
        const image = new Image();
        // image.crossOrigin = "Anonymous";
        image.onload = () => resolve( image );
        // image.crossOrigin = "Use-Credentials";
        image.src = src;   
    })
}
