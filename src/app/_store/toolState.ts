import { makeAutoObservable } from 'mobx';
import { Tool } from '@tools';

class ToolState {
  tool = null as Tool | null;
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  constructor() {
    makeAutoObservable(this);
    this.fillColor = '#000';
    this.strokeColor = '#000';
    this.strokeWidth = 1;
  }

  setTool(tool: Tool | null) {
    this.tool = tool;
  }

  setFillColor(color: string) {
    this.fillColor = color;
  }

  setStrokeColor(color: string) {
    this.strokeColor = color;
  }

  setLineWidth(width: number) {
    this.strokeWidth = width;
  }
}

export const toolState = new ToolState();
