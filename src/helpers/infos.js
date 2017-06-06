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
    const oX = Math.round(transform.origin.oX *100) /100;
    const oY = Math.round(transform.origin.oY *100) /100;
    const scale = Math.round(transform.scale.x *100) /100;
    return (
    <div className="pointers-infos">
        { transform.translate && 
        <div>translate : {transform.translate.dX}px, {transform.translate.dY}px </div>
        }
        { transform.rotate && 
        <div>rotate : {transform.rotate}deg</div>
        }
        { transform.scale && 
        <div>scale: {scale}</div>
        }
        { transform.origin && 
        <div>origin oX : {oX}, oY : {oY}</div>
        }
    </div>
)
}

// placer pointer-events: none; dans la css
// sinon, l'élément capture l'event et onMouseUp n'est pas lancé
export function Plotters({
    axe, 
    pointer, 
    conteneur,
    cropper,
    origin
}) {
    const {containerSize, containerPos} = conteneur;
    if (containerSize.height === 0 && containerSize.width === 0 ) return null;
    const middle = {
        top: containerSize.height * 0.5, 
        left: containerSize.width * 0.5, 
        color: 'blue'
    };
    // console.log('middle', cropper, middle, containerSize);
    
    // const oX = origin.oX + cropper.x;
    // const oY = origin.oY + cropper.y;
    const oX = origin.oX;
    const oY = origin.oY;
    // const oX = origin.oX + containerPos.contDX;
    // const oY = origin.oY + containerPos.contDY;
    const point = {top: pointer.posY, left: pointer.posX};
    const pointAxe = {top: axe.posY, left: axe.posX};
    const pOrigin = {top: oY, left: oX, color: 'green'};
    // const pOrigin = {top: origin.oY, left: origin.oX, color: 'green'};

    return (
    <div>
        <span className="plot" style={middle}>&#215;</span>
        {/*<span className="plot" style={pOrigin}>&#215;</span>*/}
        <span className="plot" style={point}>&#x2299;</span>
        <span className="plot" style={pointAxe}>&#x22a1;</span>
    </div>
    );
}
