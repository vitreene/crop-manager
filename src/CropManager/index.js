import React, {PureComponent, PropTypes} from 'react';

import Controleur from './Controleur' 
import managerLib from './Lib/managerLib'
import deepEQ from './helpers/deepEQ'

import './index.css';

const initialState = {
    image: {src: null},
    cadrage: null,
    transform: null,
    proxy: null,
    pristine: true // l'objet est-il intact ?
}

export default class CropManager extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        imgFile: PropTypes.object,
        ratio: PropTypes.number,
        cadre: PropTypes.object,
        importer: PropTypes.object,
        handleRendu: PropTypes.func,
        handleExport: PropTypes.func,
        handleCadre: PropTypes.func,
     }
    static defaultProps = {
        isLoading: false,
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
        // next contient la propriété qui a changé.
        // testFirst contient l'ordre des propriétés à appliquer
        // [ratio, imgFile, importer]
        const testFirst = ['ratio', 'imgFile', 'importer']
        const next = deepEQ(nextProps, this.props, testFirst)
        // console.log('next', next);

        // reunir : source = {ratio, imgFile}
        
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
    }

    // componentDidUpdate(prevProps, prevState) {
    componentDidUpdate() {
        // tester si state à changé ?
        this._export();
    }
    
    updatePosition(transform) {
        this._update('update', transform);
    }

    _update(action, donnees) {
        // console.log('action', action);  
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
        const {isLoading} = this.props;
        const {proxy, cadrage, transform, update} = this.state;
        
        return (
            < Controleur {
                ...{
                    updatePosition,
                    proxy,
                    cadrage,
                    transform,
                    update,
                    isLoading
                }
            } />
        );
    }
}
