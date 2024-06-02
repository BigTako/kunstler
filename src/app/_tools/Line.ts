import { Tool } from '@tools';

export class Line extends Tool {
  public mouseDown: boolean;
  private currentX: number;
  private currentY: number;
  private saved: string;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.listen();
    this.mouseDown = false;
    this.currentX = 0;
    this.currentY = 0;
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
    this.currentX = e.pageX - target.offsetLeft;
    this.currentY = e.pageY - target.offsetTop;
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.currentX, this.currentY);
      this.saved = this.canvas.toDataURL();
    }
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      const target = e.target as HTMLElement;
      this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
    }
  }

  draw(x: number, y: number) {
    const img = new Image();
    img.src = this.saved;

    // eslint-disable-next-line no-unused-vars
    img.onload = async function (this: Line) {
      if (this.ctx) {
        const currentLineCap = this.ctx.lineCap;
        const currentLineJoin = this.ctx.lineJoin;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.currentX, this.currentY);
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.lineCap = currentLineCap;
        this.ctx.lineJoin = currentLineJoin;
      }
    }.bind(this);
  }
}
