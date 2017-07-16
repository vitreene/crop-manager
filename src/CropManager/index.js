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
        cadre: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            ratio: PropTypes.number,
        }),
        importer: PropTypes.object,
        handleCadre: PropTypes.func,
        handleRendu: PropTypes.func,
        handleExport: PropTypes.func,
     }
    static defaultProps = {
        cadre: {},
        imgFile: {},
        importer: {},
        handleCadre: () => {}, 
        handleRendu: () => {}, 
        handleExport: () => {},
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
        const {imgFile, cadre, importer} = nextProps;
        const {ratio} = cadre;

        if (importer) {
            const counter = (this.props.importer) 
                ? this.props.importer.counter
                : 0;
             if (importer.counter !== counter) {
                 /*
                 const cadreImport = {
                     ratio: importer.cadrage.ratio,
                     width: 300,
                     height: null,
                 };
                    */
                manipImage
                .importer(importer)
                .then( () => this._update(importer.cadre) ); 
                return;
            }
        }

        if (imgFile) {
            const counter = (this.props.imgFile)
                ? this.props.imgFile.counter
                : 0;
            const {src} = imgFile;
            
            console.log('imgFile.counter', imgFile.counter, counter);
             if (imgFile.counter !== counter) {
                manipImage
                .create(src, ratio) 
                .then( () => this._update(cadre) );  
                return;
             }
        }
        
        if (ratio !== this.props.cadre.ratio) {           
            manipImage.updateCadre(ratio);
            this._update(cadre);
        }
    }

    updatePosition(transform) {
        const {cadre} = this.props;
        manipImage.update(transform);
        this._update(cadre);
    }

    _update(cadre) {
        this.setState( manipImage.read() );
        // paser cadre autrement
        this.props.handleRendu( manipImage.rendu(cadre) );
        this.props.handleExport( manipImage.exporter() );
        this.props.handleCadre( cadre );
    }

    render() {        
        const {updatePosition, state} = this;
        return (
            <Controleur {...{updatePosition, ...state}}/> 
        );
    }
}
