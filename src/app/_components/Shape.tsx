import React, { ReactElement, ReactNode } from 'react';

import { observer } from 'mobx-react-lite';
import { Rect, Line, Ellipse } from 'react-konva';
import { EllipseType, LineType, Palm, RectType, ShapeEnum, ShapeType } from '@tools';
import { canvasState, toolState } from '@store';
import Konva from 'konva';
import dynamic from 'next/dynamic';

const Scalable = dynamic(() => import('./Scalable'), { ssr: false });

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
        console.log({ scaleX, scaleY, scaledWidth, scaledHeight });
        canvasState.updateShape(props.id, {
          x: node.x(),
          y: node.y(),
          width: scaledWidth,
          height: scaledHeight,
        } as RectType);
      }}
    >
      <Draggable id={id} draggable={draggable}>
        <Rect x={x} y={y} stroke={stroke} strokeWidth={strokeWidth} fill={fill} width={width} height={height} />
      </Draggable>
    </Scalable>
  );
}

interface ScalableEllipseProps {
  id: number;
  isSelected: boolean;
  onSelect: () => void;
  radiusX: number;
  radiusY: number;
  x: number;
  y: number;
  fill?: string; // Add this line
  stroke: string;
  strokeWidth: number;
  draggable: boolean;
}

function ScalableEllipse(props: ScalableEllipseProps) {
  const { id, x, y, stroke, strokeWidth, fill, radiusX, radiusY, draggable, ...scalableProps } = props;
  return (
    <Scalable
      {...scalableProps}
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
      <Draggable id={id} draggable={draggable}>
        <Ellipse
          x={x}
          y={y}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          radiusX={radiusX}
          radiusY={radiusY}
        />
      </Draggable>
    </Scalable>
  );
}

function Draggable({ id, draggable, children }: { id: number; draggable: boolean; children: ReactNode }) {
  return React.cloneElement(children as ReactElement, {
    draggable,
    onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => {
      canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as RectType);
    },
  });
}

const Shape = observer(function ({ shape }: { shape: ShapeType }) {
  const [selectedId, setSelectedId] = React.useState(-1);

  const handleSelect = (id: number) => {
    if (selectedId === id) {
      setSelectedId(-1);
    } else {
      setSelectedId(id);
    }
  };

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
      <Draggable id={id} draggable={draggable}>
        <ScalableRect
          id={id}
          x={x}
          y={y}
          width={width}
          height={height}
          draggable={draggable}
          fill={fillColor as string}
          stroke={strokeColor as string}
          strokeWidth={strokeWidth as number}
          isSelected={id === selectedId}
          onSelect={() => handleSelect(id)}
        />
      </Draggable>
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
        isSelected={id === selectedId}
        draggable={draggable}
        onSelect={() => handleSelect(id)}
      />
    );
  }
});

export default Shape;
