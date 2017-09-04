// rendu dans un canvas.
/*
entrées :
l'objet manip :
- image,
- transformation

le canvas:
- dimensions du canvas à creer
https://stackoverflow.com/questions/17411991/html5-canvas-rotate-image

opération : 
- creer le canvas aux dimensions demandées
- adapter l'échelle de l'image : au rapport image/crop, ajouter le rapport crop/ canvas.
draw image ;
- trouver un script sharpen
- crrer les images, au choix png/jpeg, save image.
*/

import React from 'react';

import Demo from '../App/demo-file'
import Preview from './preview'
import Download from './download'


export default function DrawCanvas(props) {
    const {handleImport, rendu} = props;
    const image = rendu && rendu.image;
    return(
        <aside className="element-rendu">
            <Demo {...{handleImport}}/>
            <Preview {...rendu}/>
            {image && 
                <Download {...rendu}/>
            }
      </aside>
        
    )
}
