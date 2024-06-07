import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { canvasState } from '@store';
import { RectType } from '@tools';
import { Rect } from 'react-konva';
import Konva from 'konva';
import { Shape as KonvaShape, ShapeConfig as KonvaShapeConfig } from 'konva/lib/Shape';

const Scalable = dynamic(() => import('./Scalable'), { ssr: false });

function ScalableRect({ shape, draggable }: { shape: RectType; draggable: boolean }) {
  const { id, x, y, strokeColor, strokeWidth, fillColor, width, height } = shape;

  const handleScale = useCallback(
    (node: KonvaShape<KonvaShapeConfig>) => {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      const scaledWidth = Math.max(5, node.width() * scaleX);
      const scaledHeight = Math.max(5, node.height() * scaleY);
      canvasState.updateShape(id, {
        x: node.x(),
        y: node.y(),
        width: scaledWidth,
        height: scaledHeight,
      } as RectType);
    },
    [id],
  );

  return (
    <Scalable shapeId={id} scale={handleScale}>
      <Rect
        x={x}
        y={y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={fillColor}
        width={width}
        height={height}
        draggable={draggable}
        onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
          canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as RectType);
        }}
      />
    </Scalable>
  );
}
export default ScalableRect;
