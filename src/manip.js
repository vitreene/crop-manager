import React, {Component, PropTypes} from 'react';

import Controleur from './controleur'

import initial from './config/initial'

const visuel = initial.proxy;
const crop = {
    w: initial.crop.width,
    h: initial.crop.height,
    padding: initial.crop.padding,
};


export default class Manip extends Component {
     static propTypes = {
        id: PropTypes.string
     }
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.prep = this.prep.bind(this);
    }

    state = {}

    prep(manip) {
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
           <Controleur {...{visuel, crop, prep}}/> 
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

function recordTransform(manip, image, crop) {
    const {transform, pivot, cropper: {ratio} }  = manip;
    /*
- image : dimensions;
- crop : dimensions;
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
    
}
/*
       manip = {
        transform:  {
            translate: {dX: 0, dY: 0},
            rotate: 0,
            scale: 1
        },
        pivot: {
            h: 1,
            v: 1
        },
        conteneur: {
            // dX: 0, dY: 0, width: 0, height: 0
            containerPos: {contDX: 0, contDY: 0}, 
            containerSize: {width: 0, height: 0},
        },
        cropper: {
            x: 0, y: 0, w: 0, h: 0            
        }        
    }
*/

/*
const hydrate = { 
    translate: {dX: 50, dY: -50},
    rotate: 60,
    scale: 1.4    
}
*/
