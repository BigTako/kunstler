import { makeAutoObservable } from 'mobx';
import { Tool } from '@tools';

class ToolState {
  tool = null as Tool | null;
  strokeColor: string;
  fillColor: string;
  lineWidth: number;
  constructor() {
    makeAutoObservable(this);
    this.fillColor = '#000';
    this.strokeColor = '#000';
    this.lineWidth = 1;
  }

  setTool(tool: Tool) {
    this.tool = tool;
  }

  setFillColor(color: string) {
    this.fillColor = color;
  }

  setStrokeColor(color: string) {
    this.strokeColor = color;
  }

  setLineWidth(width: number) {
    this.lineWidth = width;
  }
}

export const toolState = new ToolState();
