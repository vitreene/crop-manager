/* eslint-disable */
import React, {PureComponent, PropTypes} from 'react';

import Controleur from './Controleur'
import ManipImage from './Store'
import {IDLE, DONE} from './config/constantes'

import modele from './config/modele'

const manipImage = new ManipImage();

export default class CropManager extends PureComponent {
    static propTypes = {
        imgFile: PropTypes.object,
        // cadrage: PropTypes.shape({
            /*
        cadre: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            ratio: PropTypes.number,
        }),
        */
        importer: PropTypes.object,
        handleRatio: PropTypes.func,
        handleRendu: PropTypes.func,
        handleExport: PropTypes.func,
     }
    static defaultProps = {
        // cadre: {},
        ratio: 1,
        imgFile: {},
        importer: {},
        handleRatio: () => {}, 
        handleRendu: () => {}, 
        handleExport: () => {},
    }

    constructor(props) {
        super(props);
        this.updatePosition = this.updatePosition.bind(this);
        this._update = this._update.bind(this);
    }

    state = modele

    componentWillReceiveProps(nextProps) {
        const {imgFile, ratio, importer} = nextProps;

        if (importer) {
            const counter = (this.props.importer) 
                ? this.props.importer.counter
                : 0;
             if (importer.counter !== counter) {
                const{cadre, ...reste} = importer;
                manipImage
                .importer(reste)
                .then( () => {
                    this.props.handleCadre(cadre);
                    this._update() }); 
                return;
            }
        }

        if (imgFile) {
            const counter = (this.props.imgFile)
                ? this.props.imgFile.counter
                : 0;
            const {src} = imgFile;
            
            // console.log('imgFile.counter', imgFile.counter, counter);
             if (imgFile.counter !== counter) {
                manipImage
                .create(src, ratio) 
                .then( () => this._update() );  
                return;
             }
        }
        
        if (ratio !== this.props.ratio) {           
            manipImage.updateCadre(ratio);
            this._update();
        }
    }

    updatePosition(transform) {
        // const {cadre} = this.props;
        manipImage.update(transform);
        this._update();
    }

    _update() {
        this.setState( manipImage.read() );
        this.props.handleExport( manipImage.exporter() );
        // this.props.handleRatio( ratio );

        // 2. comment déclencher le rendu ?
        // les données de rendu sont dans Sources;
        // la fonction de calcul est dans Crop-manager
        // le composant est dans App.
        /*
        le composant recupère le résultat dans le state depuis toCanvas
        toCanvas recoit me résultat de handleExport
        comment faire passer cadre dans handleExport -> via props.
        */
        this.props.handleRendu( manipImage.rendu(this.props.cadre) );
    }

    render() {        
        const {updatePosition, state} = this;
        return (
            <Controleur {...{updatePosition, ...state}}/> 
        );
    }
}

/*
PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
])
*/