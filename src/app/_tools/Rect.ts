import { makeAutoObservable } from 'mobx';
import { KonvaEventObject } from 'konva/lib/Node';
import { DrawingFuncType, LineType, RectType, ShapeType, Tool } from '@tools';
import { canvasState } from '@store';

export class Rect implements Tool {
  lines: LineType[] = [];
  isDrawing: boolean = false;
  draw: DrawingFuncType;

  constructor(draw: DrawingFuncType) {
    makeAutoObservable(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.draw = draw;
  }

  onMouseDown(e: KonvaEventObject<MouseEvent>) {
    this.isDrawing = true;
    const stage = e.target.getStage();
    if (stage) {
      const pos = stage.getPointerPosition();

      if (pos) {
        canvasState.addShape({ type: 'rect', x: pos.x, y: pos.y, width: 0, height: 0 } as ShapeType);
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
      const lastRect = canvasState.shapes.pop() as RectType;
      if (point && lastRect) {
        const width = point.x - lastRect.x;
        const height = point.y - lastRect.y;
        canvasState.addShape({ ...lastRect, width, height } as ShapeType);
      }
    }
  }

  onMouseUp() {
    this.isDrawing = false;
  }
}
