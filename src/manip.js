/* eslint-disable */
import React, {Component, PropTypes} from 'react';

import Controleur from './controleur'

import manipImage from './Store'

import initial from './config/initial'
const image = initial.image;
const preset = initial.preset;

export default class Manip extends Component {
     static propTypes = {
        id: PropTypes.string
     }
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.prep = this.prep.bind(this);
    }

// utiliser le state que pour déclencher les mises à jour :
// -> upload,
// -> change preset,
// ->  reglages 
// pas lorsque la position est mise à jour  depuis Instance
    state = {
        proxy:{},
        cadrage:{},
        transform:{}
    }
        
    componentDidMount() {
        
        const cb = (manip) => {
            // console.log('canvas', manip);
           this.setState({...manip});
        }
        const img = manipImage.create(image.src, preset, cb);
        
    }

    prep(manip) {

        // console.log('PREP',manip); 

        /*
        prep pourrait etre le point d'entrée commun de plusieurs opérations d'export.
        il recevrait des données composées d'une action et de datas.
        ces datas doivent auparavant etre transformées pour l'export.
        */
        // console.log('PREP',manip.transform, manip.pivot); 
    }

    render() {
     const {prep} = this;
      return (
           <Controleur {...{prep, ...this.state}}/> 
        );
    }
}

/*
dimensions :
x, y pour le top et left de l'élément,
dX, dY : décalage
w, h : largeur hauteur de référence
width, height : dimensions appliquées
*/



    /*
a faire : 
- le schéma d'enregistrement,
- le schéma de lecture
- les formules de transformation.

    décision : les données seront le plus virtualisées possible.
    -> l'image est le référent. Si l'image change, on repart de zéro.

- image : dimensions;
- crop : dimensions;
C: {x: 0, y: 0}
D: sqrt( img.x2 + img.y2)
L= D
H = r * L
r = L/H
img transform{
scale : E,
rotate: A,
translate: T{dX,dY}
}


- en export :
    exprimer le rapport de l'image par rapport au crop.
    en calculant l'hypothenuse de chacun
    h = Math.sqrt( width * width + height * heigth )
    rapport = hypImg / hypCrop
    dx: translate.dX - cropper.w * 0.5 / cropper.w
    dy: translate.dy - cropper.wh * 0.5 / cropper.h
    scale: (scale * hypImg) / hypCrop
    rotation et pivot tels quels.

    ai-je besoin d'une conversion ? j'ai ejà un systeme de conversion à l'échelle dans le rendu qui n'existait pas dans la premiere version.
    seul le passage des pixels à pourcents est clean pour un export.

    j'ai besoin d'une conversion pour le passage du proxy à l'original.
    echelle et decalage sont enregistrés selon le rapport à l'image reelle
    -> rapport = hypImg / hypProx 

tranform et pivot : mettre à l'echelle, puis appliquer 
    */
