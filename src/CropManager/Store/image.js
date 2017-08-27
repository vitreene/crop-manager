export default function (img) {
    const {src} = img; 
    const name = img.hasOwnProperty('name') 
    ? img.name 
    : src.split("/").pop().split(".")[0];

    return new Promise(resolve => {
        const image = new Image();
        // image.crossOrigin = "Anonymous";
        image.onload = () => resolve( image );
        // image.crossOrigin = "Use-Credentials";
        image.src = src;  
        image.name = name; 
    })
}
