/* eslint-disable */
import React, {PureComponent, PropTypes} from 'react';

import Controleur from './controleur'
import ManipImage from './Store'
import {IDLE, DONE} from './config/constantes'

import modele from './config/modele'

const manipImage = new ManipImage();

export default class Manip extends PureComponent {
    static propTypes = {
        src: PropTypes.string,
        // src: PropTypes.object,
        cadrage: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            ratio: PropTypes.number,
        }),
        importer: PropTypes.object,
        handleRendu: PropTypes.func,
        handleExport: PropTypes.func
     }

    constructor(props) {
        super(props);
        this.updatePosition = this.updatePosition.bind(this);
        this._update = this._update.bind(this);
    }

    state = modele
        /*
    componentDidMount() {
        const {importer} = this.props;
        if (importer) {
            console.log('imorter', importer);
            
            manipImage.import(importer)
            .then( () => this._update(importer.cadre) );
        }
    }
    */
    componentWillReceiveProps(nextProps) {
        // console.log('nextProps', nextProps);
        
        const {src, cadre} = nextProps;
        const {ratio} = cadre;

        if (src !== this.props.src) {
            manipImage.create(src, ratio) 
            .then( () => this._update(cadre) );  
            return;
        }
        
        if (ratio !== this.props.cadre.ratio) {           
            manipImage.updateCadre(ratio);
            this._update(cadre);
        }
    }

    updatePosition(manip) {
        const {cadre} = this.props;
        manipImage.update(manip);
        this._update(cadre);
    }

    _update(cadre) {
        this.setState( manipImage.read() );
        this.props.handleRendu( manipImage.rendu(cadre) );
        this.props.handleExport( manipImage.export() );
    }

    render() {        
        const {updatePosition, state} = this;
        return (
            <Controleur {...{updatePosition, ...state}}/> 
        );
    }
}
