/* eslint-disable */

import React from 'react';

export enum ShapeEnum {
  RECT = 'rect',
  LINE = 'line',
  ELLIPSE = 'ellipse',
  IMAGE = 'image',
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

export enum ImageProcessingMode {
  RESIZE = 'resize',
  CROP = 'crop',
}

export interface ImageType extends ShapeType {
  x: number;
  y: number;
  width: number;
  height: number;
  cropX: number;
  cropY: number;
  cropWidth: number;
  cropHeight: number;
  src: string;
}

export type DrawingFuncType = (shape: Shape, id: number | string) => React.ReactNode;
