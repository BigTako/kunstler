import { Tool } from '@tools';
import { canvasState } from '../_store';

export class CanvasImage extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  draw(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        var imgWidth = img.width / 2;
        var imgHeight = img.height / 2;
        const imgX = this.canvas.width / 2 - imgWidth / 2;
        const imgY = this.canvas.height / 2 - imgHeight / 2;
        if (this.ctx) {
          this.ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
        }
      };
      img.src = reader.result as string;
      const imgWidth = img.width / 2;
      const imgHeight = img.height / 2;
      const imgX = this.canvas.width / 2 - imgWidth / 2;
      const imgY = this.canvas.height / 2 - imgHeight / 2;
      canvasState.pushShape({
        // type: 'image',
        // src: reader.result,
        x: imgX,
        y: imgY,
        width: imgWidth,
        height: imgHeight,
      });
    };
    reader.readAsDataURL(file);
  }
}
