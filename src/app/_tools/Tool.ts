/* eslint-disable */
import { KonvaEventObject } from 'konva/lib/Node';

export interface Tool {
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  onMouseUp(e?: KonvaEventObject<MouseEvent>): void;
  onMouseDown(e?: KonvaEventObject<MouseEvent>): void;
  onMouseMove(e?: KonvaEventObject<MouseEvent>): void;
}
