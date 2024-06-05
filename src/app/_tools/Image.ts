import { makeAutoObservable } from 'mobx';
import { Tool } from './Tool';
import { ImageType, ShapeEnum } from '@tools';
import { canvasState } from '../_store';

export class ImageTool implements Tool {
  isDrawing: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  upload(file: File) {
    const url = URL.createObjectURL(file);
    canvasState.addShape({
      type: ShapeEnum.IMAGE,
      src: url,
      x: 0,
      y: 0,
      width: 200,
      height: 200,
    } as ImageType);
  }

  onMouseDown() {}

  onMouseMove() {}

  onMouseUp() {}
}
