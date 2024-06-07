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
    let { points, strokeColor, strokeWidth } = shape as LineType;
    return (
      <Line
        points={points}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
      />
    );
  }
  if (shape.type === ShapeEnum.RECT) {
    return <ScalableRect shape={shape as RectType} draggable={draggable} />;
  }
  if (shape.type === ShapeEnum.ELLIPSE) {
    return <ScalableEllipse shape={shape as EllipseType} draggable={draggable} />;
  }
  if (shape.type === ShapeEnum.IMAGE) {
    return <ScalableImage draggable={draggable} shape={shape as ImageType} />;
  }
});

export default Shape;
