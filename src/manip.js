/* eslint-disable */
import React, {PureComponent, PropTypes} from 'react';

import Controleur from './controleur'
import ManipImage from './Store'
import {IDLE, DONE} from './config/constantes'
import {modele} from './config/initial'

const manipImage = new ManipImage();

export default class Manip extends PureComponent {
    static propTypes = {
        src: PropTypes.string,
        cadrage: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            ratio: PropTypes.number,
        }),
        toCanvas: PropTypes.func
     }

    constructor(props) {
        super(props);
        this.updatePosition = this.updatePosition.bind(this);
    }

    state = modele
        
    // componentDidMount() {
    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps);
        
        const {src, cadre} = nextProps;
        const {ratio} = cadre;

        if (src !== this.props.src) {
            console.log('manipImage.create');
            
            manipImage.create(src, ratio)
            // -> action: DONE  
            .then( () => {
                this.setState( manipImage.read() );
                this.props.toCanvas( manipImage.rendu(cadre) );
                });  
            return;
        }
        
        if (ratio !== this.props.cadre.ratio) {
            
            manipImage.updateCadre(ratio);
            // const action = (res) ? DONE : IDLE ;
            this.setState( manipImage.read() );
            this.props.toCanvas( manipImage.rendu(cadre) );
            console.log('manipImage.updateCadre');
        }
    }

    updatePosition(manip) {
        const {cadre} = this.props;
        manipImage.update(manip);
        this.setState( manipImage.read() );
        this.props.toCanvas( manipImage.rendu(cadre) );
    }

    render() {        
        const {updatePosition, state} = this;

        return (
            <Controleur {...{updatePosition, ...state}}/> 
        );
    }
}
