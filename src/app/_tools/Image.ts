import { makeAutoObservable } from 'mobx';
import { Tool } from './Tool';
import { ImageType } from '@tools';
import { canvasState } from '../_store';

export class ImageTool implements Tool {
  isDrawing: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  upload(file: File) {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const image = new window.Image();
        image.src = img.src;
        image.onload = () => {
          canvasState.addShape({
            type: 'image',
            src: img.src,
            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
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
