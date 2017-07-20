import React, {Component} from 'react';

import ChoixCadrage from './choix-cadrage'
import Upload from './upload'

import CropManager from '../CropManager'
import {cadreDefaults} from './config/initial'
import cadreLib from './cadre-lib'
const cadrelib = new cadreLib();

const Source = function(Composant){
        return class Sources extends Component {
        constructor(props) {
            super(props);

            this.getUrl = this.getUrl.bind(this);
            this.getInputs = this.getInputs.bind(this);
            this.getRatio = this.getRatio.bind(this);
            // this.handleImport = this.handleImport.bind(this);
        }

        state = {
            ...cadrelib.init(),
            imgFile: null,
        }

        getUrl(imgFile) {     
            this.setState({imgFile});
        }

        getInputs(inputs){
            this.setState( cadrelib.inputs(inputs) );
        }

        getRatio() { }
        
        render() {
            const {imgFile, ...cadre} = this.state;
            const {ratio} = cadre;
            const {props, getUrl, getInputs, getRatio} = this;
    
            return (
                <main className="element-wrapper">

                    <aside className="element-sources">
                        <Upload {...{getUrl}}/>
                        <ChoixCadrage {...{cadre, getInputs}}/>
                    </aside>

                    <Composant
                        {...{imgFile, ratio, cadre}}
                        handleRatio={getRatio}
                        handleCadre={getInputs}
                        {...props}
                    />

                </main>
            )
        }
    }
}

export default Source(CropManager);

                        // handleRendu={toCanvas}  
                        // importer={importer}
                        // handleExport={toExport}