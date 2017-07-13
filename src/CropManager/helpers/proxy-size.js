// entrees :
// image:  width, height, 
// cadrage / cropper : diagonale, ratio,
// cadre / crop : width, height,

// sortie :
// proxy :  width, height, 
// + : amplifier ?

export default function (cadrage, cadre) {
    // console.log('cadrage', cadrage);
    // console.log('cadre', cadre);
    const width = cadre.w;
    const height = cadre.h;
    
    const {diagonale, ratio, image} = cadrage;
    const r = diagonale / width;
    // console.log('image', image);
    // console.log('diagonale / width', diagonale, width, r);
    
    // verifier que les proportions sont les memes 
    if ( eq(ratio) === eq(width/height))
        return {
            width: image.width / r,
            height: image.height / r
        }
}


// arrondi 2 chiffres après la virgule
function eq(val) {
    return Math.round(val * 100) / 100;
}