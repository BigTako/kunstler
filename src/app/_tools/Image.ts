import { makeAutoObservable } from 'mobx';
import { Tool } from './Tool';
import { ImageProcessingMode, ImageType } from '@tools';
import { canvasState } from '@store';

export class ImageTool implements Tool {
  mode: ImageProcessingMode;

  constructor() {
    makeAutoObservable(this);
    this.mode = ImageProcessingMode.RESIZE;
  }

  setMode(mode: ImageProcessingMode) {
    this.mode = mode;
  }

  upload(file: File) {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const image = new window.Image();
        image.src = img.src;
        const imgWidth = image.width / 3;
        const imgHeight = image.height / 3;
        const x = window.innerWidth / 2 - imgWidth / 2;
        const y = window.innerHeight / 2 - imgHeight / 2;
        image.onload = () => {
          canvasState.addShape({
            type: 'image',
            src: img.src,
            x,
            y,
            width: imgWidth,
            height: imgHeight,
            cropX: 0,
            cropY: 0,
            cropWidth: 0,
            cropHeight: 0,
          } as ImageType);
        };
      };
    };
    reader.readAsDataURL(file);
  }

  onMouseDown() {}

  onMouseMove() {}

  onMouseUp() {}
}
