import React from 'react';

import { observer } from 'mobx-react-lite';
import { Rect, Line, Circle } from 'react-konva';
import { CircleType, LineType, RectType, ShapeEnum, ShapeType } from '@tools';

const Shape = observer(function ({ shape }: { shape: ShapeType }) {
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
    let { x, y, width, height } = shape as RectType;
    return <Rect x={x} y={y} width={width} height={height} fill="red" />;
  }
  if (shape.type === ShapeEnum.CIRCLE) {
    let { x, y, radius } = shape as CircleType;
    return <Circle x={x} y={y} radius={radius} fill="black" />;
  }
});

export default Shape;
