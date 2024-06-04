import { makeAutoObservable } from 'mobx';
import { Tool } from '@tools';

export class Palm implements Tool {
  constructor() {
    makeAutoObservable(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseDown() {}

  onMouseMove() {}

  onMouseUp() {}
}
