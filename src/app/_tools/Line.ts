import { makeAutoObservable } from 'mobx';
import { KonvaEventObject } from 'konva/lib/Node';
import { LineType, ShapeEnum, ShapeType, Tool } from '@tools';
import { canvasState, toolState } from '@store';

export class Line implements Tool {
  isDrawing: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  private startLine(pos: { x: number; y: number }) {
    canvasState.addShape({
      type: ShapeEnum.LINE,
      strokeColor: toolState.strokeColor,
      lineWidth: toolState.lineWidth,
      points: [pos.x, pos.y, pos.x, pos.y],
    } as LineType);
  }

  onMouseDown(e: KonvaEventObject<MouseEvent>) {
    this.isDrawing = true;
    const stage = e.target.getStage();
    if (stage) {
      const pos = stage.getPointerPosition();
      if (pos) {
        this.startLine(pos);
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
      if (point) {
        const { x, y } = point;
        let { points, ...rest } = canvasState.shapes.pop() as LineType;
        const [startX, startY] = points;
        canvasState.addShape({ ...rest, points: [startX, startY, x, y] } as ShapeType);
      }
    }
  }

  onMouseUp() {
    this.isDrawing = false;
  }
}
