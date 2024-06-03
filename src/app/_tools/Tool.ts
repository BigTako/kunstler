import { KonvaEventObject } from 'konva/lib/Node';

export interface Tool {
  /* eslint-disable */
  onMouseUp(e?: KonvaEventObject<MouseEvent>): void;
  onMouseDown(e?: KonvaEventObject<MouseEvent>): void;
  onMouseMove(e?: KonvaEventObject<MouseEvent>): void;
}
