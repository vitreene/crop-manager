import React, {Component} from 'react';

import ChoixCadrage from './choix-cadrage'
import Upload from './upload'

import CropManager from '../CropManager'
import {cadreDefaults} from './config/initial'

const Source = function(Composant){
        return class Sources extends Component {
        constructor(props) {
            super(props);

            this.getUrl = this.getUrl.bind(this);
            this.getCadre = this.getCadre.bind(this);
        }

        state = {
            cadre : {
            width: cadreDefaults.width,
            height: cadreDefaults.height,
            ratio: cadreDefaults.ratio,
            },
            imgFile: null,
            importer: null
        }

        getUrl(imgFile) {     
            this.setState({imgFile});
        }

        getCadre(cadre){
            const {width, height} = this.state.cadre;
            const idem = (cadre.width === width) && (cadre.height === height);
            // console.log('cadre, idem', cadre, idem);
            
            if (!idem) this.setState({ cadre })
        }

        render() {
            const {imgFile, cadre,} = this.state;
            const {importer} = this.props;
            const {getImport, getUrl, getCadre} = this;
    
            return (
                <main className="element-wrapper">

                    <aside className="element-sources">
                        <Upload {...{getUrl}}/>
                        <ChoixCadrage {...{cadre, getCadre}}/>
                    </aside>

                    <Composant
                        {...{imgFile, cadre}}
                        importer={importer}
                        handleCadre={getCadre}
                    />

                </main>
            )
        }
    }
}

export default Source(CropManager);

                        // handleRendu={toCanvas} 
                        // handleExport={toExport}