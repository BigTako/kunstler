/* eslint-disable */
import { KonvaEventObject } from 'konva/lib/Node';
import { DrawingFuncType } from '@tools';

export interface Tool {
  draw: DrawingFuncType;
  onMouseUp(e?: KonvaEventObject<MouseEvent>): void;
  onMouseDown(e?: KonvaEventObject<MouseEvent>): void;
  onMouseMove(e?: KonvaEventObject<MouseEvent>): void;
}
