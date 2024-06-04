import React from 'react';

import { observer } from 'mobx-react-lite';
import { Rect, Line, Circle } from 'react-konva';
import { CircleType, LineType, Palm, RectType, ShapeEnum, ShapeType } from '@tools';
import { canvasState, toolState } from '@store';

const Shape = observer(function ({ shape }: { shape: ShapeType }) {
  const draggable = toolState.tool instanceof Palm;
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
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        draggable={draggable}
        onDragEnd={e => {
          canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as RectType);
        }}
      />
    );
  }
  if (shape.type === ShapeEnum.CIRCLE) {
    let { id, x, y, radius, fillColor, strokeColor, lineWidth: strokeWidth } = shape as CircleType;
    return (
      <Circle
        x={x}
        y={y}
        radius={radius}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        draggable={draggable}
        onDragEnd={e => {
          canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as CircleType);
        }}
      />
    );
  }
});

export default Shape;
