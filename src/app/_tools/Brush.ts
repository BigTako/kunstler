import { makeAutoObservable } from 'mobx';
import { KonvaEventObject } from 'konva/lib/Node';
import { Tool } from '@tools';

interface LineType {
  points: number[];
}

export class Brush implements Tool {
  lines: LineType[] = [];
  isDrawing = false;

  constructor() {
    makeAutoObservable(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  startLine(pos: { x: number; y: number }) {
    this.lines.push({ points: [pos.x, pos.y] });
  }

  addPoint(pos: { x: number; y: number }) {
    let lastLine = this.lines[this.lines.length - 1];
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
