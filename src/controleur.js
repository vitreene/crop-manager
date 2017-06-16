import React, {Component, PropTypes} from 'react';

import Wrapper from './wrapper'
import LayerInputs from './Layers/layer-inputs'
import LayerFond from './Layers/layer-fond'
import LayerCrop from './Layers/layer-crop'
import Reglages from './reglages'
import Loading from './Loading'


import {DONE, IDLE} from './config/constantes'

// eslint-disable-next-line
import {Transformers, Plotters, Pointers} from './helpers/infos'

import Instance from './Instance'

const manip = new Instance({
    action: 'Ta-Da-dammm'
});

export default class Controleur extends Component {
     static propTypes = {
        // id: PropTypes.string
        proxy: PropTypes.object,
        cadrage: PropTypes.object,
        transform: PropTypes.object,
        updatePosition: PropTypes.func,
        prep: PropTypes.func,
        action: PropTypes.string,
     }

    constructor(props) {
        super(props);
        this.getPointerPosition = this.getPointerPosition.bind(this);
        this.getPivot = this.getPivot.bind(this);
        this.rotate90 = this.rotate90.bind(this);
        this.transformPreset = this.transformPreset.bind(this);
        this.onConteneurResize = this.onConteneurResize.bind(this);
    }

    state = {
        rendu: {
            translate: {dX: 0, dY: 0},
            rotate: 0,
            scale: 1,
            origin: {oX: 0, oY: 0},
        },
        action: IDLE
    }
  
    componentWillMount() {
        manip.log();
    }

    componentWillReceiveProps(newProps) {
        // mise à disposition asynchrone 
        // de l'image et de sa transform initiale.
        const {action, transform, proxy, cadrage} = newProps;
        // console.log('transform, proxy, cadrage', action, transform, proxy, cadrage);
        (action === DONE) &&
        this.setState( manip.init(transform, cadrage, proxy) );
    }

    componentDidUpdate() {
        if (this.state.action !== DONE) return;
        
        // console.log('sendPosition', this.state.action);
        this.props.updatePosition(manip.export());
        this.setState({action: IDLE});
    }

    onConteneurResize(conteneur) {
        this.setState( 
            manip.resize(conteneur) 
        );
    }

    getPivot({h,v}){
       this.setState( 
           manip.pivoter(h,v) 
        );   
    }
    
    getPointerPosition({type, pointers}) {
        this.setState( 
            manip.updatePosition(type, pointers) 
        );
    }
    
    transformPreset(action){
        this.setState( 
            manip.transformPreset(action) 
        );
    }
    
    rotate90(sens){
        console.log('rotate', sens);
        
        this.setState( 
            manip.rotate90(sens) 
        );
    }
    render() {
        const {proxy, isLoading} = manip;
        const {rendu} = this.state;
        const {
            getPointerPosition, 
            onConteneurResize, 
            getPivot, 
            rotate90,
            transformPreset
        } = this;
        const {conteneur, cropper, cropWrapper, pivot} = manip;
        
        // eslint-disable-next-line
        const {pointers, action, message} = manip;

        return (
            <div className="manip-conteneur">
                <Wrapper {...{onConteneurResize}} >
                { ( isLoading) 
                ? (<Loading/>)
                : ( <div>
                        <LayerFond {...{rendu, proxy, cropper}}/>
                        <LayerCrop {...{rendu, proxy, cropWrapper, cropper}}/>
                        <LayerInputs {...{getPointerPosition, ...conteneur}}/>
                    </div> )
                }
                </Wrapper>
                    <Reglages {...{rotate90, getPivot, pivot, transformPreset}}/>
                    <Transformers {...{rendu}} />
                    {/*<Pointers {...{rendu, pointers, action, message}} />*/}
                    <Plotters {...{...pointers, conteneur, cropper}}/> 
            </div>
        );
    }
}
