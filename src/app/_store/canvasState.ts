import { makeAutoObservable } from 'mobx';

export class CanvasState {
  canvas = null as HTMLCanvasElement | null;
  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
}

export const canvasState = new CanvasState();
