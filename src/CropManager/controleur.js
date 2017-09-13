import React, {Component, PropTypes} from 'react';

import Wrapper from './Wrapper'
import LayerScale from './Layers/layer-scale'
import LayerRotate from './Layers/layer-rotate'
import LayerInputs from './Layers/layer-inputs'
import LayerFond from './Layers/layer-fond'
import LayerCrop from './Layers/layer-crop'
import LayerReticule from './Layers/layer-reticule'
import Reglages from './Reglages'
import Loading from './UI/Loading'
// eslint-disable-next-line
import {Transformers, Plotters, Pointers} from './infos'

import {DONE, IDLE} from './config/constantes'

import controlerLib  from './Lib/controlerLib'

import initialState from './config/instance-init'

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
        action: IDLE,
    }
  
    componentWillReceiveProps(newProps) {
        if (newProps.update === this.props.update) return;
        // mise à disposition asynchrone 
        // de l'image et de sa transform initiale.
        const {transform, proxy, cadrage} = newProps;
        // console.log('newProps', newProps);
        if (!transform || !cadrage || !proxy) return;

        this.handleControl('init', {transform, proxy, cadrage})
    }

    componentDidUpdate() {
        // console.log('this.state.action ', this.state.action );
        if (this.state.action !== DONE) return;

        const exporter = controlerLib.export(this.state);
        // console.log('exporter', exporter);
        this.props.updatePosition(exporter);
        this.setState({action: IDLE});
    }

    handleControl(action, donnees) {       
        this.setState( state => controlerLib.execute(action, donnees, state) );
    }

    render() {
        const {handleControl} = this;
        const {conteneur, cropper, cropWrapper, proxy, isLoading, rendu, transform, start} = this.state;
        const {pivot} = this.state.transform;
 
        return (
            <div className="manip-conteneur">
                <Wrapper {...{handleControl}} >
                { isLoading
                    ? (proxy.src && <Loading/>)
                    : ( <div>
                        <LayerFond {...{rendu, proxy, cropper}}/>
                        <LayerCrop {...{rendu, proxy, cropper, cropWrapper}}/>
                        <LayerReticule {...{conteneur}}/>
                        <LayerInputs {...{handleControl, conteneur}}/>
                        <LayerScale {...{handleControl, transform}}/>
                        <LayerRotate {...{handleControl, conteneur, transform}}/>
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
