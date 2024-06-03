/* eslint-disable */

import React from 'react';

export interface ShapeType {
  type: 'line' | 'rect' | 'circle';
  strokeColor?: string;
  fillColor?: string;
}

export interface LineType extends ShapeType {
  points: number[];
}

export interface ReactType extends ShapeType {
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
