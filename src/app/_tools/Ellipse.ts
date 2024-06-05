import { makeAutoObservable } from 'mobx';
import { KonvaEventObject } from 'konva/lib/Node';
import { EllipseType, RectType, ShapeEnum, ShapeType, Tool } from '@tools';
import { canvasState, toolState } from '@store';

export class Ellipse implements Tool {
  isDrawing: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown(e: KonvaEventObject<MouseEvent>) {
    console.log('drawing ellipse');
    this.isDrawing = true;
    const stage = e.target.getStage();
    if (stage) {
      const pos = stage.getPointerPosition();

      if (pos) {
        canvasState.addShape({
          type: ShapeEnum.ELLIPSE,
          fillColor: toolState.fillColor,
          strokeColor: toolState.strokeColor,
          lineWidth: toolState.lineWidth,
          x: pos.x,
          y: pos.y,
          radiusX: 0,
          radiusY: 0,
        } as EllipseType);
      }
    }
  }

  onMouseMove(e: KonvaEventObject<MouseEvent>) {
    if (!this.isDrawing) {
      return;
    }
    const stage = e.target.getStage();
    if (stage) {
      const point = stage.getPointerPosition();
      const lastCircle = canvasState.undoList.pop() as RectType;
      if (point && lastCircle) {
        let c1 = point.x - lastCircle.x;
        let c2 = point.y - lastCircle.y;

        const radius = Math.sqrt(Math.pow(c1, 2) + Math.pow(c2, 2));
        canvasState.addShape({ ...lastCircle, radiusX: radius, radiusY: radius } as ShapeType);
      }
    }
  }

  onMouseUp() {
    this.isDrawing = false;
  }
}
