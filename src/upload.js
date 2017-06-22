import React, {Component, PropTypes} from 'react';
import {isClient} from './config/constantes'

import Icon from './UI/icones'
import Text from './UI/text'

export default class Upload  extends Component {
    static propTypes = {
        getUrl: PropTypes.func,
    }
    constructor(props) {
        super(props)
        this.upload = this.upload.bind(this);
    }

    state = {  }
    
     upload(e){
        if (isClient) {
         const objUrl = window.URL.createObjectURL(e.target.files[0]);
         this.props.getUrl(objUrl);
        }
     }

    render() {
        return (
            <div>
                <input 
                className="input-hidden"
                id="upload-file"
                type="file"
                accept="image/*"
                onChange={this.upload}
                />
                <label htmlFor="upload-file"
                className="label-reglage">
                    <Icon name="upload"  />
                    <Text small color="black">upload file</Text>
                </label>
            </div>            
        );
    }
}