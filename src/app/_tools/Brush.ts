import { makeAutoObservable } from 'mobx';
import { KonvaEventObject } from 'konva/lib/Node';
import { LineType, Tool } from '@tools';
import { canvasState, toolState } from '@store';

export class Brush implements Tool {
  isDrawing: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  private startLine(pos: { x: number; y: number }) {
    canvasState.addShape({
      type: 'line',
      strokeColor: toolState.strokeColor,
      strokeWidth: toolState.strokeWidth,
      points: [pos.x, pos.y],
    } as Omit<LineType, 'id'>);
  }

  private addPoint(pos: { x: number; y: number }) {
    let lastLine = canvasState.last() as LineType;
    lastLine.points = lastLine.points.concat([pos.x, pos.y]);
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
      if (point) this.addPoint(point);
    }
  }

  onMouseUp() {
    this.isDrawing = false;
  }
}
