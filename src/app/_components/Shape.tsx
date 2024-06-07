import React from 'react';

import { observer } from 'mobx-react-lite';
import { Line } from 'react-konva';
import { EllipseType, ImageType, LineType, RectType, ShapeEnum, ShapeType } from '@tools';
import dynamic from 'next/dynamic';

const ScalableRect = dynamic(() => import('./ScalableRect'), { ssr: false });
const ScalableEllipse = dynamic(() => import('./ScalableEllipse'), { ssr: false });
const ScalableImage = dynamic(() => import('./ScalableImage'), { ssr: false });

interface ShapePropsType {
  shape: ShapeType;
  draggable: boolean;
}

const Shape = observer(function ({ shape, draggable }: ShapePropsType) {
  if (shape.type === ShapeEnum.LINE) {
    let { points, strokeColor, lineWidth } = shape as LineType;
    return (
      <Line
        points={points}
        stroke={strokeColor}
        strokeWidth={lineWidth}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
      />
    );
  }
  if (shape.type === ShapeEnum.RECT) {
    let { id, x, y, width, height, fillColor, strokeColor, lineWidth: strokeWidth } = shape as RectType;

    return (
      <ScalableRect
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor as string}
        stroke={strokeColor as string}
        strokeWidth={strokeWidth as number}
        draggable={draggable}
      />
    );
  }
  if (shape.type === ShapeEnum.ELLIPSE) {
    let { id, x, y, radiusX, radiusY, fillColor, strokeColor, lineWidth: strokeWidth } = shape as EllipseType;
    return (
      <ScalableEllipse
        id={id}
        x={x}
        y={y}
        radiusX={radiusX}
        radiusY={radiusY}
        fill={fillColor}
        stroke={strokeColor as string}
        strokeWidth={strokeWidth as number}
        draggable={draggable}
      />
    );
  }
  if (shape.type === ShapeEnum.IMAGE) {
    // const { id, x, y, height, width, src, draggable } = shape as ImageType;
    return (
      <ScalableImage
        draggable={draggable}
        shape={shape as ImageType}
        // id={id}
        // x={x}
        // y={y}
        // height={height}
        // width={width}
        // src={src}
        // draggable={draggable}
        // blurRadius={blurRadius}
        // brightness={brightness}
        // contrast={contrast}
        // noise={noise}
      />
    );
  }
});

export default Shape;
