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
// let point = {posX: 0, posY:0};
// valeur du décalage entre point et la nouvelle valeur pointer
let move = {dX: 0, dY: 0};

// arrivee : position en fin d'action 
// translate : valeur du déplacement en %

// + : le decalage initial
let initial;
let translate;

export default function(position){

    const {pointer, axe, action, containerSize, transform} = position;
    let res;

    switch (action) {
        case 'start' :
           res = 'c’est parti!' 
           debut = pointer;
        //    point = pointer;
           initial = transform.translate
            break;
    
        case 'move' :
           move = {
               dX: pointer.posX - debut.posX,
               dY: pointer.posY - debut.posY,
           };
        //    move = {
        //        dX: pointer.posX - point.posX,
        //        dY: pointer.posY - point.posY,
        //    };
        //    point = pointer;
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
            // point = {posX: 0, posY:0};
            break;
    
        default:
            break;
    }

        // const translate = { 
        //     dX: Math.round( (move.dX / containerSize.width) *100),
        //     dY: Math.round( (move.dY / containerSize.height) *100),
        // }
    return {
        message : res,
        translate,
        };
}

