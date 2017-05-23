import React, {Component, PropTypes} from 'react';

import Wrapper from './wrapper'
import LayerInputs from './Layers/layer-inputs'
import LayerFond from './Layers/layer-fond'
import LayerCrop from './Layers/layer-crop'
import Reglages from './reglages'

import transformer from './helpers/transformer'
import {setCropWrapper, setCropper} from './helpers/cropper-size'

import {/*Transformers, Plotters, */Pointers} from './helpers/infos'


const hydrate = { 
    translate: {dX: 50, dY: -50},
    rotate: 60,
    scale: 1.4    
}

export default class Controleur extends Component {
     static propTypes = {
        // id: PropTypes.string
        visuel: PropTypes.string,
        crop: PropTypes.object
     }
    constructor(props) {
        super(props);
        this.getPointerPosition = this.getPointerPosition.bind(this);
        this.getPivot = this.getPivot.bind(this);
        this.getConteneurSize = this.getConteneurSize.bind(this);
        this.getCropSize = this.getCropSize.bind(this);
        this.updateRendu = this.updateRendu.bind(this);
    }
    state = {
        rendu: {
            translate: {dX: 0, dY: 0},
            rotate: 0,
            scale: 1
        }
    }
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
        pointers: {
            pointer: {posX: 0, posY: 0},
            axe: {posX: 0, posY: 0},
        },
        conteneur: {
            // dX: 0, dY: 0, width: 0, height: 0
            containerPos: {contDX: 0, contDY: 0}, 
            containerSize: {width: 0, height: 0},
        },
        cropper: {
            x: 0, y: 0, w: 0, h: 0            
        },        
        action: null,
        device: null,
        message: ''
    }

    componentDidMount() {
    }

    getConteneurSize({containerPos, containerSize}) {
        this.manip.conteneur = { containerPos, containerSize};
       this.getCropSize(containerSize)
        this.updateRendu();
    }

    getCropSize(size){
        const {crop} = this.props;
        this.manip.cropWrapper = setCropWrapper(size, crop);
        this.manip.cropper = setCropper(this.manip.cropWrapper, crop);
        this.updateRendu();   
    }

    getPivot({h,v}){
        // transformer true/false en (-1)/(+1) (true = checked)
        this.manip.pivot = {
            h: h ? -1 : 1,
            v: v ? -1 : 1,
        };
        this.updateRendu();
    }
    
    getPointerPosition({type, pointers}) {
        const {transform, pivot} = this.manip;
        const manip = transformer({
            type, 
            pointers, 
            transform,
            pivot
        });   
        this.manip = {...this.manip, ...manip};
        this.updateRendu();  
    }

    updateRendu(){
        /*
        - mettre le transform à l'échelle locale
        */
        const {transform, pivot} = this.manip;
        const {dX, dY} = transform.translate;

        // si pivot est l'un des deux : h ou v, rotate = 180 - t.rotate ;
        const rotate = ((pivot.h + pivot.v) === 0) 
            ? 180 - transform.rotate
            : transform.rotate;

        const scale = {
            x: transform.scale * pivot.v, 
            y: transform.scale * pivot.h
        };

        const translate = {
            dX: dX * pivot.h,
            dY: dY * pivot.v
        };

        const rendu = {translate, rotate, scale};
        this.setState({rendu});
    }

    render() {
      const {visuel, crop} = this.props;
      const {rendu} = this.state;
      const {getPointerPosition, getConteneurSize, getPivot} = this;
      const {conteneur, cropper, cropWrapper} = this.manip;
 
      const {pointers, action, message} = this.manip;

      return (
            <div className="manip-conteneur">

                <Wrapper {...{getConteneurSize}} >
                    <LayerFond {...{rendu, visuel, cropper}}/>
                    <LayerCrop {...{rendu, visuel, cropWrapper, cropper}}/>
                    <LayerInputs {...{getPointerPosition, ...conteneur}}/>
                </Wrapper>

                    <Reglages {...{getPivot}}/>
                    {/*<Transformers {...{rendu}} />*/}
                    <Pointers {...{rendu, pointers, action, message}} />
                    {/*<Plotters {...{...pointers, ...conteneur}}/>*/}
                    
            </div>
        );
    }
}


