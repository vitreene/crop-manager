import React, {Component, PropTypes} from 'react';

import Wrapper from './wrapper'
import LayerInputs from './Layers/layer-inputs'
import LayerFond from './Layers/layer-fond'
import LayerCrop from './Layers/layer-crop'
import Reglages from './reglages'

import transformer from './helpers/transformer'
import {setCropWrapper, setCropper} from './helpers/cropper-size'
import proxySize from './helpers/proxy-size'
import {/*DEG, START, MOVE, END, */DONE} from './config/constantes'

// eslint-disable-next-line
import {Transformers, Plotters, Pointers} from './helpers/infos'

export default class Controleur extends Component {
     static propTypes = {
        // id: PropTypes.string
        proxy: PropTypes.object,
        crop: PropTypes.object,
        transform: PropTypes.object,
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
        proxy: {
            // src: null,
            width: 0,
            height: 0
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

    componentWillReceiveProps(newProps) {
        // disposition de l'image asynchrone.
        const {transform, proxy, cadrage} = newProps;
        this.manip.transform = newProps.transform;  
        // cadrage par défaut.
        const dims = proxySize(cadrage, this.manip.cropper);
        this.manip.proxy = Object.assign( 
            {},
             dims,
            {src: proxy.src}
        );
        // console.log('this.manip.proxy',dims,  this.manip.proxy);
        this.updateRendu(); 
    }

    sendPosition(action){
        if (action !== DONE) return;
        const {prep} = this.props;
        prep(this.manip);
    }

    getConteneurSize({containerPos, containerSize}) {
        this.manip.conteneur = {containerPos, containerSize};
        this.getCropSize(containerSize);
    }

    getCropSize(size){
        const {crop} = this.props;
        this.manip.cropWrapper = setCropWrapper(size, crop);
        this.manip.cropper = setCropper(this.manip.cropWrapper, crop);

///
      const {proxy, cadrage} = this.props;
        const dims = proxySize(cadrage, this.manip.cropper);
        this.manip.proxy = Object.assign( 
            {},
             dims,
            {src: proxy.src}
        );

///
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
        this.manip = {...this.manip, ...manip};
        this.updateRendu(); 
        this.sendPosition(manip.action);
    }

    updateRendu(){
        /*
        - mettre le transform à l'échelle locale
        */
        const {transform, pivot, cropper, hasOrigin} = this.manip;
        // const {width, height} = this.props.proxy;
        const {width, height} = this.manip.proxy;
       console.log('updateRendu proxy', width, height,this.props.proxy );
       
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
    //   const {proxy} = this.props;
      const {proxy} = this.manip;
      const {rendu} = this.state;
      const {origin} = rendu;
    // console.log('rendu',  rendu);
      const {getPointerPosition, getConteneurSize, getPivot} = this;
      const {conteneur, cropper, cropWrapper} = this.manip;
 // eslint-disable-next-line
      const {pointers, action, message} = this.manip;

      return (
            <div className="manip-conteneur">

                <Wrapper {...{getConteneurSize}} >
                    <LayerFond {...{rendu, proxy, cropper}}/>
                    <LayerCrop {...{rendu, proxy, cropWrapper, cropper}}/>
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

// eslint-disable-next-line
function rotation(cx, cy, x, y, angle) {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    return{
        rX : (cos * (x - cx)) + (sin * (y - cy)) + cx,
        rY : (cos * (y - cy)) - (sin * (x - cx)) + cy
    }
}