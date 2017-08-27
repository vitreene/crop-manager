import React, {Component, PropTypes} from 'react';
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

    state = { value: ''}
    
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
            this.setState({value: ''});
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
                value={this.state.value}
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