// importe une image avec un pre-reglage
/*
l'image est dans ./public

*/

import React, {PropTypes} from 'react';
import {storage} from './config/initial';
let counter = 0;
const Demo = (props) => {
    function  upload() {
        counter++;
        props.getImport({...storage, counter});
    }
    return (
        <button onClick={upload}>DEMO</button>          
    );
}

Demo.propTypes = {
    getImport: PropTypes.func,
}

export default Demo;