// cree un cadrage à partir d'un cadre en px. 

export default function (
    cadre = {width: 150, height: 100}, 
    image = {width: 150, height: 100},
    padding = 5
    ) {
        const {width, height} = image;
        const diagonale = hypothenuse(width, height);
        const ratio = cadre.width / cadre.height;        
        return {diagonale, ratio, padding, image: {width, height} };
}

function hypothenuse(width, height) {
    return Math.sqrt( width * width + height * height )
}

