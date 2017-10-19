import React from 'react';
import Icon from '../../App/UI/icones'

const LayerInfo = () => {

    return (
        <div className="layer-base layer-info">

            <h2>Crop-Manager</h2>
            <h1>recadrez vos images  en quelques secondes&nbsp;!</h1>
            <p>
                Glissez directement une image, ou cliquez sur l'icone&nbsp;<Icon name="upload"/>
            </p>
            <p>
              
            </p>

            <p className="em">
               à la souris
            </p>
            <p>
                clic pour délacer l'image, Maj + click pour tourner et aggrandir
            </p>
            <p  className="em">
               tactile
            </p>
            <p>
                à deux doigts pour pour tourner et agrandir
            </p>
            
            <p  className="last">
                Téléchargez votre image aux dimensions voulues.
            </p>

        </div>

    )
};

export default LayerInfo;
