/* eslint-disable */

import React from 'react';

export enum ShapeEnum {
  RECT = 'rect',
  LINE = 'line',
  ELLIPSE = 'ellipse',
}

export interface ShapeType {
  id: number;
  type: ShapeEnum;
  lineWidth?: number;
  strokeColor?: string;
  fillColor?: string;
}

export interface LineType extends ShapeType {
  points: number[];
}

export interface RectType extends ShapeType {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface EllipseType extends ShapeType {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
}

export type DrawingFuncType = (shape: Shape, id: number | string) => React.ReactNode;
