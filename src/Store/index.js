// create, read, update 

import getImage from './image'
import makeProxy from './proxy'
import makeCropper from './cropper'
import initTransform from './transform'

const manipImage = (function() {

    // create object
    function create(url, cadre, callback ) {
        // image: src
        // cropper: w, h
        getImage(url)
        .then( img => makeProxy(img) )
        .then(( {image, proxy}) => {
            const cadrage = makeCropper(cadre, image);
            const transform = initTransform(cadrage, image);
            // construire l’objet à partir de l’image
            // -> proxy, si pas de proxy, utiliser la hd.
            // -> crop,
            // -> transform            
            callback({proxy, cadrage, transform});
        })
    }
    // update transform
    function update(params) {
        
    }
    // update Cropper
    function updateCropper(params) {
        
    }

return {
    create,
    update,
}
})()

export default manipImage
