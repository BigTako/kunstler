import React from 'react';
import dynamic from 'next/dynamic';
import { canvasState } from '@store';
import { RectType } from '@tools';
import { Rect } from 'react-konva';
import Konva from 'konva';

interface ScalableRectProps {
  id: number;
  isSelected: boolean;
  onSelect: () => void;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  draggable: boolean;
}

const Scalable = dynamic(() => import('./Scalable'), { ssr: false });

function ScalableRect(props: ScalableRectProps) {
  const { id, x, y, stroke, strokeWidth, fill, width, height, draggable, ...scalableProps } = props;

  return (
    <Scalable
      {...scalableProps}
      scale={node => {
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const scaledWidth = Math.max(5, node.width() * scaleX);
        const scaledHeight = Math.max(5, node.height() * scaleY);
        canvasState.updateShape(props.id, {
          x: node.x(),
          y: node.y(),
          width: scaledWidth,
          height: scaledHeight,
        } as RectType);
      }}
    >
      <Rect
        x={x}
        y={y}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
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
