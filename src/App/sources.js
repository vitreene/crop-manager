import React, {Component} from 'react';

import CropManager from '../CropManager'
import ChoixCadrage from './choix-cadrage'
import Upload from './upload'
import Dropzone from 'react-dropzone'

import{FILEMAX} from './config/constantes'
import cadreLib from './cadre-lib'

const Sources = function(Composant){
        return class Sources extends Component {
        constructor(props) {
            super(props);

            this.getUrl = this.getUrl.bind(this);
            this.getInputs = this.getInputs.bind(this);
            this.loadImage = this.loadImage.bind(this);
            this.validateInput = this.validateInput.bind(this);
            this.onDrop = this.onDrop.bind(this);
        }

        state = {
            ...cadreLib.init(),
            imgFile: null,
        }

        counter = 0

        onDrop(acceptedFiles, rejectedFiles) {
            console.log('acceptedFiles', acceptedFiles);
            console.log('rejectedFiles', rejectedFiles);
            if (rejectedFiles[0]) return;
            const upFile = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = () => {
                const imgFile = {
                    name: upFile.name,
                    type: upFile.type,
                    size: Math.round(upFile.size / 1000),
                    src: reader.result,
                    // file: upFile
                };
                this.loadImage(imgFile);
            }
            reader.readAsDataURL(upFile);
        }
        
        getUrl(imgFile) { 
            this.loadImage(imgFile);
        }
        
        loadImage(imgFile) {
            this.counter++ ;
            this.setState({imgFile: {...imgFile, counter: this.counter}});
        }

        getInputs(inputs){
            this.setState( state => cadreLib.inputs(inputs, state) );
        }

        validateInput(){
            this.setState( state => cadreLib.validate(state) );
        }
        
        render() {
            const {imgFile, ...cadre} = this.state;
            const {ratio, placeholder} = cadre;
            const {props, getUrl, getInputs, validateInput, onDrop} = this;
    
            return (
                <div className="element-wrapper">

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
                        <Composant
                            {...{imgFile, ratio}}
                            cadre={placeholder}
                            handleCadre={getInputs}
                            {...props}
                        />
                    </Dropzone>
                </div>
            )
        }
    }
}

export default Sources(CropManager);

                        // handleRendu={toCanvas}  
                        // importer={importer}
                        // handleExport={toExport}