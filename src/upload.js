import React, {Component, PropTypes} from 'react';

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
         console.log('e', e.target.files[0]);
         const objUrl = window.URL.createObjectURL(e.target.files[0]);
         this.props.getUrl(objUrl);
     }

    render() {
        return (
            <input 
            type="file"
            accept="image/*"
            onChange={this.upload}
            />
        );
    }
}