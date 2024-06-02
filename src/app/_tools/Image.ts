import { Tool } from '@tools';

export class CanvasImage extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  draw(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const imgWidth = img.width / 2;
        const imgHeight = img.height / 2;
        const imgX = this.canvas.width / 2 - imgWidth / 2;
        const imgY = this.canvas.height / 2 - imgHeight / 2;
        if (this.ctx) {
          this.ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
        }
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
