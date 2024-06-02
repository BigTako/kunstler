import { makeAutoObservable } from 'mobx';

interface Shape {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class CanvasState {
  canvas = null as HTMLCanvasElement | null;
  shapes = [] as Shape[];
  selectedShape = null as Shape | null;
  constructor() {
    makeAutoObservable(this);
  }

  pushShape(shape: Shape) {
    this.shapes.unshift(shape);
  }

  selectShape(x: number, y: number) {
    const shape = this.shapes.find(
      shape => x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height,
    );
    if (shape) {
      this.selectedShape = shape;
    }
    console.log({ shape: JSON.stringify(shape) });
    return shape;
  }

  unselectShape() {
    this.selectedShape = null;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
}

export const canvasState = new CanvasState();
