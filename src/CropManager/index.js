/* eslint-disable */
import React, {PureComponent, PropTypes} from 'react';

import './index.css';

import Controleur from './Controleur'
import ManagerLib from './Store'
import {IDLE, DONE} from './config/constantes'

import modele from './config/modele'
const managerLib = new ManagerLib();


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
        imgFile: {src: null},
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
                managerLib.importer(reste)
                .then( () => {
                    this._update('importer') }); 
                    this.props.handleCadre(cadre);
                return;
            }
        }

        if (imgFile) {
            const propImgFileSrc = this.props.imgFile && 
            ('src' in this.props.imgFile) && 
            this.props.imgFile.src;

            const {src} = imgFile;
            
             if (imgFile.src !== propImgFileSrc) {
                managerLib.create(src, ratio) 
                .then( () => this._update('imgFile') );  
                return;
             }
        }
        
        // console.log('Ratio', (ratio !== this.props.ratio));
        
        if (ratio !== this.props.ratio) {           
            managerLib.updateCadre(ratio);
            this._update('ratio');
        }
    }

    updatePosition(transform) {
        // const {cadre} = this.props;
        managerLib.update(transform);
        this._export();
    }

    _update(message) {
        console.log('managerLib.read() ', message, managerLib.read() );
        
        this._export();
        this.setState( managerLib.read() );
        this.setState( {update: this.state.update + 1} );
    }
    
    _export(){
        this.props.handleExport( managerLib.exporter() );
        this.props.handleRendu( managerLib.rendu(this.props.cadre) );
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