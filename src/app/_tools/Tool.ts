import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';

export interface Tool {
  onMouseUp(e?: KonvaEventObject<MouseEvent>): void;
  onMouseDown(e?: KonvaEventObject<MouseEvent>): void;
  onMouseMove(e?: KonvaEventObject<MouseEvent>): void;
}
