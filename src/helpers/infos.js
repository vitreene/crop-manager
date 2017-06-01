import React from 'react';


export function Pointers ({
    rendu: transform, 
    pointers: {pointer, axe}, 
    action, 
    message
}) {
    return (
    <div className="pointers-infos">
        { transform.translate && 
        <div>{message} | {transform.translate.dX}px, {transform.translate.dY}px </div>
        }
        { pointer && 
            <div>
                action :{action} -> axe x: {axe.posX}, y: {axe.posY} -> pointer x: {pointer.posX}, y: {pointer.posY} 
            </div> 
        } 
        { axe && 
            <div>axe x: {axe.posX}, y: {axe.posY} </div>
        }
        { transform.origin && 
        <div>origin oX : {transform.origin.oX}, oY : {transform.origin.oY}</div>
        }
        </div>
    )
}

export function Transformers( {rendu: transform}) {
    return (
    <div className="pointers-infos">
        { transform.translate && 
        <div>translate : {transform.translate.dX}px, {transform.translate.dY}px </div>
        }
        { transform.rotate && 
        <div>rotate : {transform.rotate}deg</div>
        }
        { transform.scale && 
        <div>scale X : {transform.scale.x}, Y : {transform.scale.y}</div>
        }
        { transform.origin && 
        <div>origin oX : {transform.origin.oX}, oY : {transform.origin.oY}</div>
        }
    </div>
)
}

// placer pointer-events: none; dans la css
// sinon, l'élément capture l'event et onMouseUp n'est pas lancé
export function Plotters({
    axe, 
    pointer, 
    containerSize,
    origin
}) {
    const middle = {
        top: containerSize.height * 0.5, 
        left: containerSize.width * 0.5, 
        color: 'blue'
    };
    const point = {top: pointer.posY, left: pointer.posX};
    const pointAxe = {top: axe.posY, left: axe.posX};
    const pOrigin = {top: origin.oY, left: origin.oX, color: 'green'};

    return (
    <div>
        <span className="plot" style={middle}>&#215;</span>
        <span className="plot" style={pOrigin}>&#215;</span>
        <span className="plot" style={point}>&#x2299;</span>
        <span className="plot" style={pointAxe}>&#x22a1;</span>
    </div>
    );
}