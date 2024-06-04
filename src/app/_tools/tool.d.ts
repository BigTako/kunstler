/* eslint-disable */

import React from 'react';

export enum ShapeEnum {
  RECT = 'rect',
  LINE = 'line',
  CIRCLE = 'circle',
}

export interface ShapeType {
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

export interface CircleType extends ShapeType {
  x: number;
  y: number;
  radius: number;
}

export type DrawingFuncType = (shape: Shape, id: number | string) => React.ReactNode;
