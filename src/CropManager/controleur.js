import React, {Component, PropTypes} from 'react';

import Wrapper from './Wrapper'
import LayerInputs from './Layers/layer-inputs'
import LayerFond from './Layers/layer-fond'
import LayerCrop from './Layers/layer-crop'
import LayerReticule from './Layers/layer-reticule'
import Reglages from './Reglages'
import Loading from './Loading'
// eslint-disable-next-line
import {Transformers, Plotters, Pointers} from './infos'

import {DONE, IDLE} from './config/constantes'
// import rendu from './config/rendu'

import controlerLib  from './Lib/controlerLib'
/*
import Instance from './Instance'
const controlerLib = new Instance({
    action: 'Ta-Da-dammm'
});

*/
const  initialState = { 
    isLoading: true,
    // translate
    dX: 0,
    dY: 0,
    // scale
    sX: 1, 
    sY: 1,
    rotate: 0,

    // objets :
    pointers: [], 

    unit: {},
    debut: {},
    arrivee: {}, // garder la derniere position du pointeur

    message: '',
    action: '',

    start: {
        translate: {dX: 0, dY: 0},
        rotate: 0,
        scale: 1,
    },
    move: {
        translation: {dX: 0, dY: 0},
        rotation: 0,
        scalation: 1,
    },
    // export
    transform: { 
        translate: {dX: 0, dY: 0}, // pourcents
        rotate: 0,
        scale: 1, // valeur
        pivot: {h: 1, v: 1}
    }, 

    conteneur: {},
    cropWrapper: {},
    cropper: {},
    
    cadrage: {},
    proxy: {}
};


export default class Controleur extends Component {
     static propTypes = {
        proxy: PropTypes.object,
        cadrage: PropTypes.object,
        transform: PropTypes.object,
        updatePosition: PropTypes.func,
     }

    constructor(props) {
        super(props);
        this.handleControl = this.handleControl.bind(this);
    }

    state = {
        ...initialState,
        // rendu,
        action: IDLE,
    }
  
    componentWillMount() {
        controlerLib.log();
    }

    componentWillReceiveProps(newProps) {
        // console.log('newProps update', newProps.update, this.props.update);
        if (newProps.update === this.props.update) return;
        console.log('newProps', newProps);
        
        // mise à disposition asynchrone 
        // de l'image et de sa transform initiale.
        const {transform, proxy, cadrage} = newProps;   
        if (!transform || !cadrage || !proxy) return;
        // if ( proxy.src === this.props.proxy.src || )

        // this.setState( controlerLib.init({transform, cadrage, proxy}) );
        this.handleControl('init', {transform, proxy, cadrage})
    }

    componentDidUpdate() {
        if (this.state.action !== DONE) return;
        const exporter = controlerLib.export(this.state);
        console.log('exporter', exporter);
        
        this.props.updatePosition(exporter);
        this.setState({action: IDLE});
    }

    handleControl(action, donnees) {       
        // controlerLib.execute(action, donnees);
        // this.setState(  controlerLib.execute(action, donnees) );
        this.setState( (state, props) => controlerLib.execute(action, donnees, state, props ));
    }

    render() {
        const {handleControl} = this;

        const {dX, dY, rotate, sX, sY} = this.state;
        const rendu = {
            translate: {dX, dY, },
            rotate,
            scale: {x: sX, y: sY}
        }

        const {proxy, isLoading} = this.state;
        const {conteneur, cropper, cropWrapper, transform: {pivot}} = this.state;

        // const {proxy, isLoading} = controlerLib;
        // const {conteneur, cropper, cropWrapper, pivot} = controlerLib;

        // eslint-disable-next-line
        // const {pointers, action, message} = controlerLib;

        return (
            <div className="manip-conteneur">
                <Wrapper {...{handleControl}} >
                { isLoading
                    ? (proxy.src && <Loading/>)
                    : ( <div>
                        <LayerFond {...{rendu, proxy, cropper}}/>
                        <LayerCrop {...{rendu, proxy, cropper, cropWrapper}}/>
                        <LayerReticule {...{...conteneur}}/>
                        <LayerInputs {...{handleControl, ...conteneur}}/>
                    </div> )
                }
                </Wrapper>
                <Reglages {...{handleControl, pivot}}/>
                {/*<Transformers {...{rendu}} />*/}
                {/*<Pointers {...{rendu, pointers, action, message}} />*/}
                {/* <Plotters {...{...pointers, conteneur, cropper}}/>  */}
            </div>
        );
    }
}
