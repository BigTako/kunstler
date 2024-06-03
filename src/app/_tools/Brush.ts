import { makeAutoObservable } from 'mobx';
import { KonvaEventObject } from 'konva/lib/Node';
import { DrawingFuncType, LineType, ShapeType, Tool } from '@tools';
import { canvasState } from '../_store';

export class Brush implements Tool {
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

  startLine(pos: { x: number; y: number }) {
    canvasState.addShape({ type: 'line', points: [pos.x, pos.y] } as ShapeType);
    // this.lines.push({ type: 'line', points: [pos.x, pos.y] });
  }

  addPoint(pos: { x: number; y: number }) {
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
