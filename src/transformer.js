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
// position précédente
let point = {posX: 0, posY:0};
// valeur du décalage entre point et la nouvelle valeur pointer
let deplacement = {dX: 0, dY: 0};

// arrivee : position en fin d'action 
// translate : valeur du déplacement en %

export default function(position){

    const {pointer, axe, action, containerSize} = position;
    let res;

    switch (action) {
        case 'start' :
           res = 'c’est parti!' 
           debut = pointer;
           point = pointer;
            break;
    
        case 'move' :
           deplacement = {
               dX: pointer.posX - point.posX,
               dY: pointer.posY - point.posY,
           };
           point = pointer;
           res = `ca bouge! deplacement : ${deplacement.dX}, ${deplacement.dY}`;
            break;
    
        case 'end' :
            const arrivee = {
                posX: debut.posX + pointer.posX,
                posY: debut.posY + pointer.posY,
            };
            res = `ah c’est fini. Point de départ: ${debut.posX} , ${debut.posY},  point d'arrivée : ${arrivee.posX}, ${arrivee.posY}`; 

            deplacement = {dX: 0, dY: 0};
            point = {posX: 0, posY:0};
            break;
    
        default:
            break;
    }
        const translate = { 
            dX: Math.round( (deplacement.dX / containerSize.width) *100),
            dY: Math.round( (deplacement.dY / containerSize.height) *100),
        }
    return {
        message : res,
        translate,
        };
}

