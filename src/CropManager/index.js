/* eslint-disable */
import React, {PureComponent, PropTypes} from 'react';

import './index.css';

import Controleur from './controleur' // le nom n'est pas le meme ?
import managerLib from './Store'
import deepEQ from './helpers/deepEQ'
import {IDLE, DONE} from './config/constantes'
import modele from './config/modele'
// const managerLib = new ManagerLib();

const initialState = {
    image: {src: null},
    cadrage: null,
    transform: null,
    proxy: null,
    pristine: true // l'objet est-il intact ?
}
const asyncActions = {'create': true, 'importer': true};


export default class CropManager extends PureComponent {
    static propTypes = {
        imgFile: PropTypes.object,
        ratio: PropTypes.number,
        cadre: PropTypes.object,
        importer: PropTypes.object,
        handleRendu: PropTypes.func,
        handleExport: PropTypes.func,
        handleCadre: PropTypes.func,
     }
    static defaultProps = {
        ratio: 1,
        imgFile: {src: null},
        importer: {counter: 0},
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

    state = {
        ...initialState,
        update: 0
    }



    componentWillReceiveProps(nextProps) {
        // console.log('CropManager nextProps');
        // const {imgFile, ratio, importer} = nextProps;

        // next contient la propriété qui a changé.
        // testFirst contient l'ordre des propriétés à appliquer
        // [ratio, imgFile, importer]
        const testFirst = ['ratio', 'imgFile', 'importer']
        // ou alors : tester les objets les moins volumineux ?

        const next = deepEQ(nextProps, this.props, testFirst)

        switch (next) {
            case 'importer':
                const{cadre, ...reste} = nextProps.importer;
                this._update('create', reste);
                this.props.handleCadre(cadre);
                break;
                
                case 'imgFile':
                this._update('create', {
                    image: nextProps.imgFile, 
                    ratio: nextProps.ratio
                })
                break;
                
            case 'ratio':
                this._update('updateCadre', nextProps.ratio);            
                break;

            default:
                break;
        }

        /*
        // -> width et height doivent actualiser rendu

        if (importer) {
            const counter = (this.props.importer) 
                ? this.props.importer.counter
                : 0;
            if (importer.counter !== counter) {
                const{cadre, ...reste} = importer;
                this._update('create', reste);
                this.props.handleCadre(cadre);
                return;
            }
        }

        if (imgFile) {
            const propImgFileSrc = this.props.imgFile && 
            ('src' in this.props.imgFile) && 
            this.props.imgFile.src;

            if (imgFile.src !== propImgFileSrc) {
                this._update('create', {src: imgFile.src, ratio})
            }
        }
        */
    /*
        if (importer) {
            const{cadre, ...reste} = importer;
                this._update('create', reste);
                this.props.handleCadre(cadre);
                return;
        }
        
        if (imgFile) {
                this._update('create', {src: imgFile.src, ratio})
        }
        
        if (ratio !== this.props.ratio) { 
            this._update('updateCadre', ratio);
        }
        */
    }

    componentDidUpdate(prevProps, prevState) {
        // tester si state à changé ?
        this._export();
    }
    
    updatePosition(transform) {
        this._update('update', transform);
    }

    _update(action, donnees) {
        // console.log('action, donnees', action, donnees);
        console.log('action', action);
        
        if (action === 'create') {
            managerLib.execute(action, donnees, this.state)
            .then(res => {
                this.setState(res);
                this.setState( state => ({update: state.update + 1}) );
            });
        } else {
            this.setState( state => managerLib.execute(action, donnees, state));
            (action !== 'update') && this.setState( state => ({update: state.update + 1}) );
        }

    }
    
    _export(){
        this.props.handleExport(managerLib.exporter(this.state) );
        this.props.handleRendu(managerLib.rendu(this.props.cadre, this.state) );
    }

    render() {        
        const {updatePosition} = this;
        const {proxy, cadrage, transform, update} = this.state;
        
        return (
            <Controleur {...{updatePosition, proxy, cadrage, transform, update}}/> 
        );
    }
}
