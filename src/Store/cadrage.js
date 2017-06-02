import {presets} from '../config/initial'
import {PADDING} from '../config/constantes'

export default function (preset, image) {
    const ratio = getPreset(preset);
    const {width, height} = image;
    const diagonale = hypothenuse(width, height);
    return {
        diagonale, 
        ratio, 
        marge: PADDING, 
        image: {width, height} 
    };
}

function getPreset(preset) {
    return presets[preset].ratio;
}

function hypothenuse(width, height) {
    return Math.sqrt( width * width + height * height )
}