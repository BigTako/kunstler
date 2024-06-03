import { makeAutoObservable } from 'mobx';
import { Tool } from '@tools';

class ToolState {
  tool = null as Tool | null;

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool: Tool) {
    this.tool = tool;
  }
}

export const toolState = new ToolState();
