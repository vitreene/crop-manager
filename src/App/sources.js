import React, {Component} from 'react';

import CropManager from '../CropManager'
import ChoixCadrage from './choix-cadrage'
import Upload from './upload'
import Dropzone from 'react-dropzone'

import{FILEMAX} from './config/constantes'
import CadreLib from './cadre-lib'
const cadrelib = new CadreLib();


let counter = 0;

const Sources = function(Composant){
        return class Sources extends Component {
        constructor(props) {
            super(props);

            this.getUrl = this.getUrl.bind(this);
            this.getInputs = this.getInputs.bind(this);
            this.validateInput = this.validateInput.bind(this);
            this.onDrop = this.onDrop.bind(this);

            // this.getRatio = this.getRatio.bind(this);
            // this.handleImport = this.handleImport.bind(this);
        }

        state = {
            ...cadrelib.init(),
            imgFile: null,
        }

        onDrop(acceptedFiles, rejectedFiles) {
            console.log('acceptedFiles', acceptedFiles);
            console.log('rejectedFiles', rejectedFiles);
            const upFile = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                counter++;
                const imgFile = {
                    name: upFile.name,
                    type: upFile.type,
                    size: Math.round(upFile.size / 1000),
                    src: reader.result,
                    counter
                    // file: upFile
                };
                this.setState({imgFile});
            }
            reader.readAsDataURL(upFile);
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
        // getRatio() { }
        
        render() {
            const {imgFile, ...cadre} = this.state;
            const {ratio, placeholder} = cadre;
            const {props, getUrl, getInputs, /*getRatio, */validateInput, onDrop} = this;
    
            return (
                <main className="element-wrapper">

                    <aside className="element-sources">
                        <Upload {...{getUrl}}/>
                        <ChoixCadrage {...{cadre, getInputs, validateInput}}/>
                    </aside>
                    <Dropzone
                        accept='image/png, image/jpeg'
                        disableClick
                        multiple={false}
                        maxSize={FILEMAX}
                        className="manip-conteneur"
                        onDrop={onDrop}
                        >
                            {/* {handleRatio={getRatio}} */}
                        <Composant
                            {...{imgFile, ratio}}
                            cadre={placeholder}
                            handleCadre={getInputs}
                            {...props}
                        />
                    </Dropzone>
                </main>
            )
        }
    }
}

export default Sources(CropManager);

                        // handleRendu={toCanvas}  
                        // importer={importer}
                        // handleExport={toExport}