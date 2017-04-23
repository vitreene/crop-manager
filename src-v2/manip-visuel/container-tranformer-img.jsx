import React from 'react';

export default function ContainerTranformerIMG (props) {
  const {children,onMouseDown,onTouchStart, posX, posY,} = props ;

  const focal = {left:posX , top:posY } ;

  function transforming() {
    const {posX, posY, currentRotation, currentScale, /*miroir*/} = props ;

    return {
      transform:`
        translate(${posX}px,${posY}px)
        rotate(${currentRotation}deg)
        scale(${currentScale})
        translateZ(0)
      `};
      //${rot} ${sca}
  }

  function miroir() {
    const {miroir:{h,v}} = props ;
    const rot  = (v) ? '180deg' : '0deg' ;
    const sca = ( (h && !v) || (v && !h) ) ? -1 : 1 ;
    return { transform:`rotateZ(${rot}) scaleX(${sca})`} ;
  }

  return (

    <div  className="manips"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      >

        <div
          className="manip-visuel"
          style={transforming()}
          >
          <div  style={miroir()}>
            {children}
          </div>
        </div>
        <div
          className="point-focal"
          style={focal}
          ></div>

    </div>

  );
}
