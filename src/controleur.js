import React, {Component, PropTypes} from 'react';

import Wrapper from './wrapper'
import LayerInputs from './Layers/layer-inputs'
import LayerFond from './Layers/layer-fond'
import LayerCrop from './Layers/layer-crop'
import Reglages from './reglages'
import Loading from './Loading'


import {DONE} from './config/constantes'

// eslint-disable-next-line
import {Transformers, Plotters, Pointers} from './helpers/infos'

import Instance from './Instance'

export default class Controleur extends Component {
     static propTypes = {
        // id: PropTypes.string
        proxy: PropTypes.object,
        cadrage: PropTypes.object,
        transform: PropTypes.object,
        prep: PropTypes.func,
     }
    constructor(props) {
        super(props);

        this.getPointerPosition = this.getPointerPosition.bind(this);
        this.getPivot = this.getPivot.bind(this);
        this.onConteneurResize = this.onConteneurResize.bind(this);
        this.sendPosition = this.sendPosition.bind(this);

        this.setState = this.setState.bind(this);
        this.manip = new Instance({
            callback: this.setState,
            action: 'Ta-Da-dammm'
        });
    }
    state = {
        rendu: {
            translate: {dX: 0, dY: 0},
            rotate: 0,
            scale: 1,
            origin: {oX: 0, oY: 0},
        }
    }
  
    componentWillMount() {
        this.manip.log();
    }

    componentWillReceiveProps(newProps) {
        // mise à disposition asynchrone 
        // de l'image et de sa transform initiale.
        const {transform, proxy, cadrage} = newProps;
        this.manip.init(transform, cadrage, proxy);
    }

    sendPosition(action){
        if (action !== DONE) return;
        console.log('sendPosition', action);
        this.props.prep(this.manip);
    }

    onConteneurResize(conteneur) {
        this.manip.resize(conteneur);
    }

    getPivot({h,v}){
        this.manip.pivoter(h,v, this.sendPosition );   
    }
    
    getPointerPosition({type, pointers}) {
        this.manip.updatePosition(type, pointers, this.sendPosition);
    }
    
    render() {
        const {proxy, isLoading} = this.manip;
        const {rendu} = this.state;
        const {origin} = rendu;
        const {getPointerPosition, onConteneurResize, getPivot} = this;
        const {conteneur, cropper, cropWrapper} = this.manip;
        
        // eslint-disable-next-line
        const {pointers, action, message} = this.manip;

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
                    <Reglages {...{getPivot}}/>
                    <Transformers {...{rendu}} />
                    {/*<Pointers {...{rendu, pointers, action, message}} />*/}
                    <Plotters {...{...pointers, conteneur, cropper, origin}}/>        
            </div>
        );
    }
}
