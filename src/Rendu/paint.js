import sharpen from './sharpen'
import {RAD} from './config/constantes'
const SHARP = 0.5;
const FILL = '#f90';

export default function paint(props) {  
    /*
    props :
    - image
    - cadre: dimensions du canvas
    - transform
    */
    if (!props.image) return;
    
    const {image, cadre, transform} = props;
    const {width, height} = cadre;
    const {translate, rotate, scale} = transform;
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = FILL;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillRect(0,0, width, height);
    ctx.translate(width/2 + translate.dX, height/2 + translate.dY);
	ctx.rotate(rotate * RAD);
	ctx.scale(scale.x, scale.y);
    ctx.drawImage(image, -(image.width/2), -(image.height/2));

    sharpen(ctx, width, height, SHARP);

    return canvas;
}

