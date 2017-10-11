// import React, {Component, PropTypes} from 'react';
import React, {PureComponent, PropTypes} from 'react';

import Wrapper from './Wrapper'
import LayerScale from './Layers/layer-scale'
import LayerRotate from './Layers/layer-rotate'
import LayerInputs from './Layers/layer-inputs'
import LayerFond from './Layers/layer-fond'
import LayerCrop from './Layers/layer-crop'
import LayerReticule from './Layers/layer-reticule'
import Controls from './Controls'
// import Loading from './UI/Loading'
// eslint-disable-next-line
import {Transformers, Plotters, Pointers} from './infos'

import {DONE, IDLE} from './config/constantes'

import controlerLib  from './Lib/controlerLib'

import initialState from './config/instance-init'

export default class Controleur extends PureComponent {
    static propTypes = {
       isLoading: PropTypes.bool,
       hasUpdate: PropTypes.number,
       proxy: PropTypes.object,
       cadrage: PropTypes.object,
       transform: PropTypes.object,
       updatePosition: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.handleControl = this.handleControl.bind(this);
        this.handleCommand = this.handleCommand.bind(this);
    }

    state = {
        ...initialState,
        action: IDLE,
    }
  
    componentWillReceiveProps(newProps) {
        
        // this.setState({isLoading: this.props.isLoading});
        if (newProps.hasUpdate !== this.props.hasUpdate) {
            // mise à disposition asynchrone 
            // de l'image et de sa transform initiale.
            const {transform, proxy, cadrage} = newProps;
            // if (!transform || !cadrage || !proxy) return;

            this.handleControl('init', {transform, proxy, cadrage})
        }
    }
    componentDidUpdate() {
        // il faut que les actions qui viennent de manager ne déclenchent pas d'update ?
        
        // console.log('this.state.action ', this.state.action );
        if (this.state.action !== DONE) return;

        const exporter = controlerLib.exporter(this.state);
        // console.log('exporter', exporter);
        this.props.updatePosition(exporter);
        this.setState({action: IDLE});
    }

    handleControl(action, donnees) {       
        this.setState( state => controlerLib.execute(action, donnees, state) );
    }

    handleCommand(action, donnees) {
        this.props[action](donnees);
    }

    render() {
        const {handleControl, handleCommand, state} = this;
        const {isLoading, commandes} = this.props;
 
        return (
            <div className="manip-conteneur">
                <Wrapper {...{handleControl, isLoading, hasSrc: state.proxy.src}} >
                    <LayerFond {...state}/>
                    <LayerCrop {...state}/>
                    <LayerReticule {...state}/>
                    <LayerInputs {...{handleControl, state}}/>
                    <LayerScale {...{handleControl, state}}/>
                    <LayerRotate {...{handleControl, state}}/>
                </Wrapper>
                <Controls {...{
                    handleControl, 
                    handleCommand,
                    commandes,
                    pivot: state.transform.pivot 
                    }}/>
            </div>
        );
    }
}

// {/*<Transformers {...{rendu}} />*/}
// {/*<Pointers {...{rendu, pointers, action, message}} />*/}
// {/* <Plotters {...{...pointers, conteneur, cropper}}/>  */}

/* <LayerFond {...{rendu, proxy, cropper}}/> */
//  <LayerCrop {...{rendu, proxy, cropper, cropWrapper}}/>