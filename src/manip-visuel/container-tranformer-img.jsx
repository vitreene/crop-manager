import React from 'react';

export default function ContainerTranformerIMG (props) {
  const {children,onMouseDown} = props ;

  function transforming() {
    const {posX, posY, currentRotation, currentScale} = props ;
    return {
      transform:`translate(${posX}px,${posY}px) rotate(${currentRotation}deg) scale(${currentScale}) translateZ(0)`};
  }

    return (
      <div
        onMouseDown={onMouseDown}
        className="manip-visuel"
        style={transforming()}
        >
       {children}
      </div>
    );
}
