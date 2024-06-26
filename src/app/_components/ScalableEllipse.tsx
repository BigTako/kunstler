import React from 'react';
import dynamic from 'next/dynamic';
import { canvasState } from '@store';
import { EllipseType } from '@tools';
import { Ellipse } from 'react-konva';
import Konva from 'konva';

const Scalable = dynamic(() => import('./Scalable'), { ssr: false });

function ScalableEllipse({ shape, draggable }: { shape: EllipseType; draggable: boolean }) {
  const { id, x, y, fillColor, strokeWidth, strokeColor, radiusX, radiusY } = shape;
  return (
    <Scalable
      shapeId={id}
      scale={node => {
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const radiusX = (node.width() * scaleX) / 2;
        const radiusY = (node.height() * scaleY) / 2;
        canvasState.updateShape(id, {
          x: node.x(),
          y: node.y(),
          radiusX,
          radiusY,
        } as EllipseType);
      }}
    >
      <Ellipse
        x={x}
        y={y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fillColor}
        radiusX={radiusX}
        radiusY={radiusY}
        draggable={draggable}
        onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
          canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as EllipseType);
        }}
      />
    </Scalable>
  );
}

export default ScalableEllipse;
