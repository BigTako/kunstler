import { makeAutoObservable } from 'mobx';
import { ShapeType, Tool } from '@tools';

class ToolState {
  tool = null as Tool | null;
  shapes: ShapeType[];

  constructor() {
    makeAutoObservable(this);
    this.shapes = [];
  }

  setTool(tool: Tool) {
    this.tool = tool;
  }

  addShape(shape: ShapeType) {
    this.shapes.push(shape);
  }
}

export const toolState = new ToolState();
