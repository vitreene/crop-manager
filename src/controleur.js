import React, {Component, PropTypes} from 'react';

import Wrapper from './wrapper'
import LayerInputs from './Layers/layer-inputs'
import LayerFond from './Layers/layer-fond'
import LayerCrop from './Layers/layer-crop'
import Reglages from './reglages'

import transformer from './helpers/transformer'
import {setCropWrapper, setCropper} from './helpers/cropper-size'
import {/*DEG, START, MOVE, END, */DONE} from './config/constantes'


import {Transformers, Plotters, Pointers} from './helpers/infos'

export default class Controleur extends Component {
     static propTypes = {
        // id: PropTypes.string
        visuel: PropTypes.object,
        crop: PropTypes.object,
        prep: PropTypes.func,
     }
    constructor(props) {
        super(props);
        this.getPointerPosition = this.getPointerPosition.bind(this);
        this.getPivot = this.getPivot.bind(this);
        this.getConteneurSize = this.getConteneurSize.bind(this);
        this.getCropSize = this.getCropSize.bind(this);
        this.updateRendu = this.updateRendu.bind(this);
        this.sendPosition = this.sendPosition.bind(this);
    }
    state = {
        rendu: {
            translate: {dX: 0, dY: 0},
            rotate: 0,
            scale: 1,
            origin: {oX: 0, oY: 0},
        }
    }
    manip = {
        transform:  {
            translate: {dX: 0, dY: 0},
            rotate: 0,
            scale: 1,
        },
        origin: {oX: 0, oY: 0},
        pivot: {
            h: 1,
            v: 1
        },
        conteneur: {
            // dX: 0, dY: 0, width: 0, height: 0
            containerPos: {contDX: 0, contDY: 0}, 
            containerSize: {width: 0, height: 0},
        },
        cropWrapper: {
            x: 0, y: 0, w: 0, h: 0            
        },
        cropper: {
            x: 0, y: 0, w: 0, h: 0 , ratio: 1           
        },        
        // à séparer ?
        pointers: {
            pointer: {posX: 0, posY: 0},
            axe: {posX: 0, posY: 0},
        },
        action: null,
        device: null,
        message: ''
    }

    componentDidMount() {
  
    }

    sendPosition(action){
        if (action !== DONE) return;
        const {prep} = this.props;
        // const {transform, pivot} = this.manip;
        // {transform, pivot}
        prep(this.manip);
    }

    getConteneurSize({containerPos, containerSize}) {
        // console.log('this.manip.conteneur.containerSize',this.manip.conteneur.containerSize,  containerSize );
        
        this.manip.conteneur = {containerPos, containerSize};
        this.getCropSize(containerSize);
        // this.updateRendu();
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
        this.sendPosition(DONE);
    }
    
    getPointerPosition({type, pointers}) {
        const {transform, pivot} = this.manip;
        const manip = transformer({
                type, 
                pointers, 
                transform,
                pivot
            }); 
        // console.log('manip', manip);
        
        this.manip = {...this.manip, ...manip};
        this.updateRendu(); 
        this.sendPosition(manip.action);
    }

    updateRendu(){
        /*
        - mettre le transform à l'échelle locale
        */
        const {transform, pivot, cropper, hasOrigin} = this.manip;
        const {width, height} = this.props.visuel;
       
        // console.log('updateRendu origin', origin);
        
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
            dX:  Math.round(dX * pivot.h),
            dY:  Math.round(dY * pivot.v)
        };
        
        const r = cropper.ratio;
        
        // ne fonctionne pas.
        if (hasOrigin) {

            this.manip.origin = {
                oX: ((width/2)  - translate.dX) * r , // ok en rotation
                oY: ((height/2) - translate.dY) * r 
            };
        }
        const {origin} = this.manip;

        const rendu = {translate, rotate, scale, origin};
        this.setState({rendu});
    }

    render() {
      const {visuel} = this.props;
      const {rendu} = this.state;
      const {origin} = rendu;
    // console.log('rendu',  rendu);
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
                    <Transformers {...{rendu}} />
                    {/*<Pointers {...{rendu, pointers, action, message}} />*/}
                    <Plotters {...{...pointers, ...conteneur, origin}}/>
                    
            </div>
        );
    }
}

       
    //    x' = cos(theta)*(x-xc) - sin(theta)*(y-yc) + xc
    //    y' = sin(theta)*(x-xc) + cos(theta)*(y-yc) + yc
function rotation(cx, cy, x, y, angle) {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return{
        rX : (cos * (x - cx)) + (sin * (y - cy)) + cx,
        rY : (cos * (y - cy)) - (sin * (x - cx)) + cy
    }
}