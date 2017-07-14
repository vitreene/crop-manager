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
      
        </div>
    )
}

export function Transformers( {rendu: transform}) {
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
}) {
    const {containerSize/*, containerPos*/} = conteneur;
    if (containerSize.height === 0 && containerSize.width === 0 ) return null;
    /*
    const middle = {
        top: containerSize.height * 0.5, 
        left: containerSize.width * 0.5, 
        color: 'blue'
    };
    */
    const hasPoint = !!(pointer.posX && pointer.posY);
    const hasPointAxe = !!(axe.posX && axe.posY);
    const point = {top: pointer.posY, left: pointer.posX};
    const pointAxe = {top: axe.posY, left: axe.posX};

    return (
    <div>
        {/*<span className="plot" style={middle}>&#215;</span>*/}
        {hasPoint && <span className="plot" style={point}>&#x2299;</span>}
        {hasPointAxe && <span className="plot" style={pointAxe}>&#x22a1;</span>}
    </div>
    );
}
