import { Tool } from '@tools';

export class Rect extends Tool {
  public mouseDown: boolean;
  private startX: number;
  private startY: number;
  private saved: string;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
    this.mouseDown = false;
    this.startX = 0;
    this.startY = 0;
    this.saved = '';
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
    this.startX = e.pageX - target.offsetLeft;
    this.startY = e.pageY - target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const target = e.target as HTMLElement;
      let currentX = e.pageX - target.offsetLeft;
      let currentY = e.pageY - target.offsetTop;
      let width = currentX - this.startX;
      let height = currentY - this.startY;
      this.draw(this.startX, this.startY, width, height);
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image();
    img.src = this.saved;

    img.onload = () => {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.rect(x, y, w, h);
        this.ctx.fill();
        this.ctx.stroke();
      }
    };
  }
}
