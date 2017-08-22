/* eslint-disable */
import React, {PureComponent, PropTypes} from 'react';

import './index.css';

import Controleur from './Controleur'
import ManipImage from './Store'
import {IDLE, DONE} from './config/constantes'

import modele from './config/modele'
const manipImage = new ManipImage();


export default class CropManager extends PureComponent {
    static propTypes = {
        imgFile: PropTypes.object,
        ratio: PropTypes.number,
        cadre: PropTypes.object,
        // cadrage: PropTypes.shape({
            /*
        cadre: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            ratio: PropTypes.number,
        }),
        */
        importer: PropTypes.object,
        // handleRatio: PropTypes.func,
        handleRendu: PropTypes.func,
        handleExport: PropTypes.func,
        handleCadre: PropTypes.func,
     }
    static defaultProps = {
        // cadre: {},
        ratio: 1,
        imgFile: {counter: 0},
        importer: {counter: 0},
        // handleRatio: () => {}, 
        handleRendu: () => {}, 
        handleExport: () => {},
        handleCadre: () => {},
    }

    constructor(props) {
        super(props);
        this.updatePosition = this.updatePosition.bind(this);
        this._update = this._update.bind(this);
        this._export = this._export.bind(this);
    }

    state = {update: 0}

    componentWillReceiveProps(nextProps) {
        console.log('CropManager nextProps');
        
        const {imgFile, ratio, importer} = nextProps;
        // console.log('imgFile', imgFile);
        // -> width et height doivent actualiser rendu

        if (importer) {
            const counter = (this.props.importer) 
                ? this.props.importer.counter
                : 0;
             if (importer.counter !== counter) {
                const{cadre, ...reste} = importer;
                manipImage.importer(reste)
                .then( () => {
                    this._update('importer') }); 
                    this.props.handleCadre(cadre);
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
                .then( () => this._update('imgFile') );  
                return;
             }
        }
        
        // console.log('Ratio', (ratio !== this.props.ratio));
        
        if (ratio !== this.props.ratio) {           
            manipImage.updateCadre(ratio);
            this._update('ratio');
        }
    }
/*
    shouldComponentUpdate(nextProps) {
        const {imgFile, ratio, importer} = nextProps;

        console.log('importer', (importer.counter !== this.props.importer.counter));
        console.log('ratio', (ratio !== this.props.ratio) );
        console.log('imgFile', (imgFile.counter !== this.props.imgFile.counter));
        
        
        // if (importer.counter !== this.props.importer.counter) return true;
        // if (ratio !== this.props.ratio) return true;
        // if (imgFile.counter !== this.props.imgFile.counter) return true;

        return false;
    }
*/
    updatePosition(transform) {
        // const {cadre} = this.props;
        manipImage.update(transform);
        this._export();
    }

    _update(message) {
        console.log('manipImage.read() ', message, manipImage.read() );
        
        this._export();
        this.setState( manipImage.read() );
        this.setState( {update: this.state.update + 1} );
    }
    
    _export(){
        this.props.handleExport( manipImage.exporter() );
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