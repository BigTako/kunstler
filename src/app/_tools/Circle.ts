import { Tool } from '@tools';

export class Circle extends Tool {
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
      let c1 = currentX - this.startX;
      let c2 = currentY - this.startY;
      let r = Math.sqrt(Math.pow(c1, 2) + Math.pow(c2, 2));
      this.draw(this.startX, this.startY, r);
    }
  }

  draw(x: number, y: number, r: number) {
    const img = new Image();
    img.src = this.saved;

    img.onload = () => {
      if (this.ctx) {
        this.ctx.strokeStyle = 'black';
        this.ctx.fillStyle = 'black';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
      }
    };
  }
}
