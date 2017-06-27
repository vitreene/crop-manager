import React, {PureComponent, PropTypes} from 'react';

import ChoixCadrage from './choix-cadrage'
import Upload from './upload'
import Manip from './Manip'

import {cadreDefaults} from './config/initial'
import {isClient} from './config/constantes'

// import {storage} from './config/initial'


export default class Sources extends PureComponent {
    static propTypes = {
        toCanvas: PropTypes.func
     }
    constructor(props) {
        super(props);
        this.getUrl = this.getUrl.bind(this);
        this.getCadre = this.getCadre.bind(this);
    }
    
    state = {
        src: null, 
        cadre: {
            width: cadreDefaults.width,
            height: cadreDefaults.height,
            ratio: cadreDefaults.ratio,
        },
    }

    getUrl(src) {
        isClient && 
        this.state.src && 
        window.URL.revokeObjectURL(this.state.src);
        this.setState({src});
    }

    getCadre({width, height, ratio}){
        this.setState({ cadre: {width, height, ratio} })
    }

    render(){
        const {getUrl, getCadre} = this;
        const {src, cadre} = this.state;
        const {toCanvas, toExport} = this.props;

        return(
            <main className="element-wrapper">
                <aside className="element-upload">
                    <Upload {...{getUrl}}/>
                    <ChoixCadrage {...{getCadre}}/>
                </aside>
                <Manip 
                    {...{src, cadre}}
                    handleRendu={toCanvas} 
                    handleExport={toExport}
                />
            </main>
        )
    }
}
                    // importer={storage}
