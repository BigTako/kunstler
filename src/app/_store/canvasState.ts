import { makeAutoObservable } from 'mobx';
import { ShapeType } from '@tools';
import { LegacyRef } from 'react';
import Konva from 'konva';

class CanvasState {
  undoList: ShapeType[] = [];
  redoList: ShapeType[] = [];
  selectedShapeId: number = -1;
  stageRef: LegacyRef<Konva.Stage> = null;

  constructor() {
    makeAutoObservable(this);
  }

  getStageRef() {
    return this.stageRef;
  }

  setStageRef(ref: LegacyRef<Konva.Stage>) {
    this.stageRef = ref;
  }

  selectShape(id: number) {
    this.selectedShapeId = id;
  }

  getShape(id: number) {
    return this.undoList.find(s => s.id === id);
  }

  selectedShape() {
    return this.undoList.find(s => s.id === this.selectedShapeId);
  }

  undo() {
    const shape = this.undoList.pop();
    if (shape) {
      this.redoList.push(shape);
    }
  }

  redo() {
    const shape = this.redoList.pop();
    if (shape) {
      this.undoList.push(shape);
    }
  }

  first() {
    if (this.undoList.length) {
      return this.undoList[0];
    }
    return null;
  }

  last() {
    if (this.undoList.length) {
      return this.undoList[this.undoList.length - 1];
    }
    return null;
  }

  updateShape(id: number, newShape: Partial<ShapeType>) {
    this.undoList = this.undoList.map(s => (s.id === id ? { ...s, ...newShape, id } : s));
  }

  addShape(shape: Omit<ShapeType, 'id'>) {
    this.undoList.push({ ...shape, id: this.undoList.length + 1 } as ShapeType);
  }
}

export const canvasState = new CanvasState();
