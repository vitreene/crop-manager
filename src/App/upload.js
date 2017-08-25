import React, {Component, PropTypes} from 'react';
// import {isClient} from './config/constantes'

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
        const upFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const imgFile = {
                name: upFile.name,
                type: upFile.type,
                size: Math.round(upFile.size / 1000),
                src: reader.result
            };
            this.props.getUrl(imgFile);
        }
        reader.readAsDataURL(upFile);
     }

    render() {
        return (
            <div className="gestion-upload">
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
                    <Text small >Choisir image</Text>
                </label>
            </div>            
        );
    }
}

/*

handleFileChange(e) {
    let inp_files = e.target.files;
    let op_all_files = [];
    for (let i = 0; i < inp_files.length; i++) {
      let to_file = inp_files[i];
      let reader_obj = new FileReader();
      reader_obj.readAsDataURL(to_file);
      reader_obj.onload = () => {
        let to_file_obj = {
          name: to_file.name,
          type: to_file.type,
          size: Math.round(to_file.size / 1000),
          base64: reader_obj.result,
          file: to_file
        };
        op_all_files.push(to_file_obj);
        if(op_all_files.length === inp_files.length) {
          if(this.props.multiple) {
            this.setState({ image_objs_array: op_all_files });
            this.props.callbackFunction(op_all_files);
          }
          else {
            this.setState({ image_objs_array: op_all_files });
            this.props.callbackFunction(op_all_files[0]);
          }
        }
      }
    }
  }
*/