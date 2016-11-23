
export default class  {
    constructor(
      maxScale = 1.5,
      minScale = 0.5,
      initScale = 0.5
    ) {
      this.currentScale = initScale ;
      this.currentRotation = 0;
      this.input = {
        dragStartX: 0,
        dragStartY: 0,
        dragX: 0,
        dragY: 0,
        dragDX: 0,
        dragDY: 0,
        dragging: false,
        touchStartDistance: 0,
        touchStartAngle: 0,
        pointers: [],
      };
      this.param = {
        maxScale,
        minScale
      };
    }

    indexOfPointer(pointerId) {
      return this.input.pointers
        .map( x=>x.pointerId)
        .indexOf(pointerId) ;
    }

    pointerDownHandler(event) {
      const pointerIndex = this.indexOfPointer(event.pointerId);

      if (pointerIndex < 0) {
        this.input.pointers.push(event);
      } else {
        this.input.pointers[pointerIndex] = event;
      }


      if (this.input.pointers.length === 1) {

        this.handleDragStart(this.input.pointers[0].clientX, this.input.pointers[0].clientY);
        // à traiter ailleurs ; quoi passer ?
        //window.addEventListener("pointermove", pointerMoveHandler, false);
        //window.addEventListener("pointerup", pointerUpHandler, false);
      }
      else if (this.input.pointers.length === 2) {
        this.handleGestureStart(
          this.input.pointers[0].clientX, this.input.pointers[0].clientY, this.input.pointers[1].clientX, this.input.pointers[1].clientY
        );
      }
    }

    pointerMoveHandler(event) {
      const pointerIndex = this.indexOfPointer(event.pointerId);

      if (pointerIndex < 0) {
        this.input.pointers.push(event);
      } else {
        this.input.pointers[pointerIndex] = event;
      }


      if (this.input.pointers.length === 1) {
        this.handleDragging(this.input.pointers[0].clientX, this.input.pointers[0].clientY);
      }
      else if (this.input.pointers.length === 2) {
        this.handleGesture(
          this.input.pointers[0].clientX, this.input.pointers[0].clientY, this.input.pointers[1].clientX, this.input.pointers[1].clientY
        );
      }
    }

    pointerUpHandler(event) {
      const pointerIndex = this.indexOfPointer(event.pointerId);
      if (pointerIndex < 0) {
      } else {
        this.input.pointers.splice(pointerIndex, 1);
      }

      if (this.input.pointers.length === 0 && this.input.dragging) {
        // à traiter ailleurs ; quoi passer ?
        this.handleDragStop();
        // window.removeEventListener("pointermove", pointerMoveHandler, false);
        // window.removeEventListener("pointerup", pointerUpHandler, false);
      } else if (this.input.pointers.length === 1) {
        this.handleGestureStop();
        this.handleDragStart(this.input.pointers[0].clientX, this.input.pointers[0].clientY);
      }
    }

    handleDragStart(x, y) {
      this.input.dragging = true;
      this.input.dragStartX = this.input.dragX = x;
      this.input.dragStartY = this.input.dragY = y;
    }

    handleDragging(x, y) {
      if (this.input.dragging) {
        this.input.dragDX = x - this.input.dragX;
        this.input.dragDY = y - this.input.dragY;
        this.input.dragX = x;
        this.input.dragY = y;
      }
    }

    handleDragStop() {
      if (this.input.dragging) {
        this.input.dragging = false;
        this.input.dragDX = 0;
        this.input.dragDY = 0;
      }
    }

    handleGestureStart(x1, y1, x2, y2) {
      this.input.isGesture = true;
      //calculate distance and angle between fingers
      const _dx = x2 - x1;
      const _dy = y2 - y1;
      this.input.touchStartDistance = Math.sqrt(_dx * _dx + _dy * _dy);
      this.input.touchStartAngle = Math.atan2(_dy, _dx);
      //we also store the current scale and rotation of the actual object we are affecting. This is needed because to enable incremental rotation/scaling.
      this.input.startScale = this.currentScale;
      this.input.startAngle = this.currentRotation;
    }

    handleGesture(x1, y1, x2, y2) {
      //console.log('posX:%s, posY:%s, eClientX:%s, eClientY:%s',x1, y1, x2, y2);
      const {minScale, maxScale} = this.param ;
      const {isGesture, touchStartAngle, touchStartDistance, startScale, startAngle} = this.input ;

      if (isGesture) {
        //calculate distance and angle between fingers
        const _dx = x2 - x1;
        const _dy = y2 - y1;
        const _touchDistance = Math.sqrt(_dx * _dx + _dy * _dy);
        const _touchAngle = Math.atan2(_dy, _dx);

        //calculate the difference between current touch values and the start values
        const _scalePixelChange = _touchDistance - touchStartDistance;
        const _angleChange = _touchAngle - touchStartAngle;
        //calculate how much this should affect the actual object

        //console.log('_touchDistance, touchStartDistance', Math.round(_touchDistance) , Math.round(touchStartDistance) );

        this.currentScale = startScale + _scalePixelChange * 0.01;
        this.currentRotation = startAngle + (_angleChange * 180 / Math.PI);
        if (this.currentScale < minScale) this.currentScale = minScale;
        if (this.currentScale > maxScale) this.currentScale = maxScale;
      }
    }

    handleGestureStop() {
      this.input.isGesture = false;
    }

    eMouseUp(ev){
      this.handleGestureStop();
      ev.preventDefault();
      this.handleDragStop();
    }

    eMouseMove(shiftKey,eClientX, eClientY, posX, posY ){
      if (shiftKey) {
          this.handleGesture(posX, posY, eClientX, eClientY);
        } else {
          this.handleDragging(eClientX, eClientY);
        }
    }

    eMouseDown(shiftKey, eClientX, eClientY, posX, posY ){

      if (shiftKey === true) {
        //assume second touchpoint is in middle of screen
        this.handleGestureStart(posX, posY, eClientX, eClientY);
      } else {
        this.handleGestureStop();
        this.handleDragStart(eClientX, eClientY);
      }
    }

}
