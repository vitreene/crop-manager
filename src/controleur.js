import React, {Component, PropTypes} from 'react';

import Wrapper from './wrapper'
import LayerInputs from './layer-inputs'
import LayerImage from './layer-image'
import LayerCrop from './layer-crop'
import Reglages from './reglages'

import transformer from './transformer'

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
        this.setCropperSize = this.setCropperSize.bind(this);
        this.getCropSize = this.getCropSize.bind(this);
        this.updateRendu = this.updateRendu.bind(this);
    }
    state = {
        cropper: {
            pos:{x: 0, y: 0}, 
            size: {w: 0, h: 0}            
        },
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
            containerPos: {contDX: 0, contDY: 0}, 
            containerSize: {width: 0, height: 0},
        },
        action: null,
        device: null,
        message: ''
    }

    componentWillMount() {
        // this.setState({transform: {...hydrate}});
    }

    getConteneurSize({containerPos, containerSize}) {
        this.manip.conteneur = { containerPos, containerSize};
        this.updateRendu();
    }

    getCropSize({pos, size}){
      const {crop} = this.props;
       this.setCropperSize({pos, size, crop});
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


    // sortir la fonction
    setCropperSize({pos, size, crop}){
    /*
    contraindre crop dans les dimensions du conteneur-inner
    */
        this.setState({
            cropper: {
                pos:{x: 0, y: 0}, 
                size: {w:0, h:0}
            }
        });      
      
    }

    render() {
      const {visuel, crop} = this.props;
    //   const {rendu, conteneur} = this.state;
      const {rendu} = this.state;
      const {getPointerPosition, getConteneurSize, getPivot} = this;
    //   const {} = this;
      const {conteneur, pointers, action, message} = this.manip;
 
      return (
            <div className="manip-conteneur">

                <Wrapper {...{getConteneurSize}} >
                    <LayerImage {...{rendu, ...conteneur, visuel}}/>
                    <LayerCrop {...{rendu, ...conteneur, visuel, crop}}/>
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


const Pointers = ({rendu: transform, pointers: {pointer, axe}, action, message}) => (
    <div className="pointers-infos">
        { transform.translate && 
        <div>{message} | {transform.translate.dX}px, {transform.translate.dY}px </div>
        }
        { pointer && 
            <div>
                action :{action} - pointer x: {pointer.posX}, y: {pointer.posY} 
            </div> 
        } 
        { axe && 
            <div>axe x: {axe.posX}, y: {axe.posY} </div>
        }
        </div>
);

const Transformers = ( {rendu: transform}) => (
        <div className="pointers-infos">
            { transform.translate && 
            <div>translate : {transform.translate.dX}px, {transform.translate.dY}px </div>
            }
            { transform.rotate && 
            <div>rotate : {transform.rotate}deg</div>
            }
            { transform.scale && 
            <div>scale X : {transform.scale.x}, Y : {transform.scale.y}</div>
            }
        </div>
)

// placer pointer-events: none; dans la css
// sinon, l'élément capture l'event et onMouseUp n'est pas lancé
const Plotters = ({axe, pointer, containerSize}) => {

    const middle = {top: containerSize.height*0.5, left: containerSize.width*0.5, color: "blue"};
    const point = {top: pointer.posY, left: pointer.posX};
    const pointAxe = {top: axe.posY, left: axe.posX};
    return (
        <div>
    <span className="plot" style={middle}>&#215;</span>
    <span className="plot" style={point}>&#x2299;</span>
    <span className="plot" style={pointAxe}>&#x22a1;</span>
    </div>
);}
