import { Tool } from '@tools';

export class Eraser extends Tool {
  public mouseDown: boolean;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
    this.mouseDown = false;
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler() {
    this.mouseDown = false;
  }

  mouseDownHandler(e: MouseEvent) {
    const target = e.target as HTMLElement;
    this.mouseDown = true;
    this.ctx?.beginPath();
    this.ctx?.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const target = e.target as HTMLElement;
      this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
    }
  }

  draw(x: number, y: number) {
    if (this.ctx) {
      const width = 50;
      this.ctx.lineWidth = width;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.strokeStyle = '#fafafa';
      this.ctx.fillStyle = '#fafafa';
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }
}
