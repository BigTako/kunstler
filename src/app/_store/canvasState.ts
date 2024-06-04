import { makeAutoObservable } from 'mobx';
import { ShapeType } from '@tools';

class CanvasState {
  shapes: ShapeType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  first() {
    if (this.shapes.length) {
      return this.shapes[0];
    }
    return null;
  }

  last() {
    if (this.shapes.length) {
      return this.shapes[this.shapes.length - 1];
    }
    return null;
  }

  addShape(shape: Omit<ShapeType, 'id'>) {
    this.shapes.push({ ...shape, id: this.shapes.length + 1 } as ShapeType);
  }
}

export const canvasState = new CanvasState();
