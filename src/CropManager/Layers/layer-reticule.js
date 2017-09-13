import React from 'react';
import Icon from '../UI/icones'

const LayerReticule = (props) => {
    const {containerSize} = props.conteneur;
    const middle = {
        top: containerSize.height * 0.5, 
        left: containerSize.width * 0.5, 
        color: 'black',
    };

    return(
        <span className="plot" style={middle}>
            <Icon name="reticule" />
        </span>
    )
}

export default LayerReticule;