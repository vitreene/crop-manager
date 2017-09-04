import React from 'react';
import paint from './paint'

const TYPEFILE = 'image/jpeg';
const ENCODER = 0.5;

let ref;

export default function Download(props) {
    function downloadCanvas() {
        const {href, download} = doCanvas(props);
        ref.href = href;
        ref.download = download;
    }
    return(
        <a 
        className="download-link"
        ref={ r => ref = r}
        onClick={downloadCanvas}
        target="_blank"> 
        Télécharger
        </a>
    )
}

function imageName( {cadre, image}) {
    const width = (cadre) ? cadre.width : 0;
    const height = (cadre) ? cadre.height : 0;
    
    const name = (image && image.name) || 'untitled';
    const imageName = `${name}_${width}_${height}.jpg`;
    return imageName;
}

function doCanvas(props) {
    const canvas = paint(props);
    return {
        href: canvas.toDataURL(TYPEFILE, ENCODER),
        download: imageName(props)
    }
}