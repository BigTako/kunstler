import React from 'react';

import { observer } from 'mobx-react-lite';
import { Rect, Line } from 'react-konva';
import { LineType, RectType, ShapeEnum, ShapeType } from '@tools';

const Shape = observer(function ({ shape }: { shape: ShapeType }) {
  if (shape.type === ShapeEnum.LINE) {
    let { points } = shape as LineType;
    return <Line points={points} stroke="#000" strokeWidth={5} tension={0.5} lineCap="round" lineJoin="round" />;
  }
  if (shape.type === ShapeEnum.RECT) {
    let { x, y, width, height } = shape as RectType;
    return <Rect x={x} y={y} width={width} height={height} fill="red" />;
  }
});

export default Shape;
