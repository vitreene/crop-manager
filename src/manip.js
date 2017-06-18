/* eslint-disable */
import React, {Component, PropTypes} from 'react';

import Controleur from './controleur'

import ManipImage from './Store'
const manipImage = new ManipImage();

// let projet = {
//         proxy:{},
//         cadrage:{},
//         transform:{}
//     };

import {IDLE, DONE} from './config/constantes'

export default class Manip extends Component {
    static propTypes = {
        image: PropTypes.shape({
            src: PropTypes.string,
        }),
        cadrage: PropTypes.shape({
            ratio: PropTypes.number,
        }),
        toCanvas: PropTypes.func
     }

    constructor(props) {
        super(props);
        this.updatePosition = this.updatePosition.bind(this);
    }

    // utiliser le state que pour déclencher les mises à jour :
    // -> upload,
    // -> change preset,
    // ->  reglages 
    // pas lorsque la position est mise à jour  depuis Instance
    state = {
        action: IDLE,
    }
        
    // componentDidMount() {
    componentWillReceiveProps(nextProps) {
        const {image, cadrage} = nextProps;

        if (image.src === this.props.image.src ) return;
        console.log('componentWillReceiveProps', image, this.props.image);

        manipImage.create(image.src, cadrage.ratio)
        // .then(res => this.manip = res );  
        .then(res => this.setState(res) );  
    }

    updatePosition(manip) {
        const {cadre} = this.props;
        manipImage.update(manip);
        this.props.toCanvas( manipImage.rendu(cadre) );
    }

    render() {        
        const {updatePosition} = this;
        const projet = manipImage.read();
        return (
            <Controleur {...{updatePosition, ...projet, ...this.state}}/> 
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
