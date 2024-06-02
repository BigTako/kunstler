import { Tool } from '@tools';
import { canvasState } from '../_store';

export class ElementMover extends Tool {
  public mouseDown: boolean;
  private startX: number;
  private startY: number;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
    this.mouseDown = false;
    this.startX = 0;
    this.startY = 0;
  }

  listen() {
    // this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseDownHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    this.mouseDown = true;
    // this.ctx?.beginPath();
    this.startX = e.pageX - target.offsetLeft;
    this.startY = e.pageY - target.offsetTop;
    const selectedShape = canvasState.selectShape(this.startX, this.startY);
    if (selectedShape) this.drawOutline(selectedShape.x, selectedShape.y, selectedShape.width, selectedShape.height);
    // this.ctx?.moveTo(this.startX, this.startY);
  }

  drawOutline(cx: number, cy: number, width: number, height: number) {
    if (this.ctx) {
      this.ctx.strokeStyle = 'red';
      this.ctx.lineWidth = 2;
      const offset = 5;
      this.ctx.strokeRect(cx - offset, cy - offset, width + offset * 2, height + offset * 2);
    }
  }

  mouseUpHandler() {
    this.mouseDown = false;
  }
}
