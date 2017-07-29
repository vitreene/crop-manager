import React, {Component} from 'react';

import CropManager from '../CropManager'
import ChoixCadrage from './choix-cadrage'
import Upload from './upload'

import CadreLib from './cadre-lib'
const cadrelib = new CadreLib();

const Source = function(Composant){
        return class Sources extends Component {
        constructor(props) {
            super(props);

            this.getUrl = this.getUrl.bind(this);
            this.getInputs = this.getInputs.bind(this);
            this.validateInput = this.validateInput.bind(this);

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
            this.setState( state => cadrelib.inputs(inputs, state) );
        }
        validateInput(){
            this.setState( state => cadrelib.validate(state) );
        }
        getRatio() { }
        
        render() {
            const {imgFile, ...cadre} = this.state;
            const {ratio} = cadre;
            const {props, getUrl, getInputs, getRatio, validateInput} = this;
    
            return (
                <main className="element-wrapper">

                    <aside className="element-sources">
                        <Upload {...{getUrl}}/>
                        <ChoixCadrage {...{cadre, getInputs, validateInput}}/>
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