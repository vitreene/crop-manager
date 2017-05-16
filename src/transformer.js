/*
entree : 
- position actuelle 
- action (start, move, end)
- pointer (x,y)
- axe (x,y)
- milieu (x,y)

sortie :
- translate (dx, dy)
- scale (s)
- rotation (r)
*/

// position initiale
let debut = {posX: 0, posY:0};

// valeur du décalage entre point et la nouvelle valeur pointer
let move = {dX: 0, dY: 0};

// arrivee : position en fin d'action 

// translate : valeur du déplacement en px
let translate = {dX: 0, dY: 0};

// + : le decalage initial
let initial;

export default function(position){
    const {axe} = position;

    return (axe) 
        ? rotateAndScaleImage(position)
        : translateImage(position)
}

function translateImage(position){
    // eslint-disable-next-line
    const {pointer, /*axe, */ action, transform} = position;
    let res;

    switch (action) {
        case 'start' :
           res = 'c’est parti!' 
           debut = pointer;
           initial = transform.translate
            break;
    
        case 'move' :
           move = {
               dX: pointer.posX - debut.posX,
               dY: pointer.posY - debut.posY,
           };
           res = `ca bouge! move : ${move.dX}, ${move.dY}`;

        translate = { 
            dX: initial.dX + move.dX,
            dY: initial.dY + move.dY,
        }           
            break;
    
        case 'end' :
            const arrivee = {
                posX: debut.posX + pointer.posX,
                posY: debut.posY + pointer.posY,
            };
            res = `ah c’est fini. Point de départ: ${debut.posX} , ${debut.posY},  point d'arrivée : ${arrivee.posX}, ${arrivee.posY}`; 

            move = {dX: 0, dY: 0};
            break;
    
        default:
            break;
    }

    return {
        message : res,
        translate,
        };

}

function rotateAndScaleImage(position) {
    console.log('rotateAndScaleImage');
    
}