import React from 'react';

import { observer } from 'mobx-react-lite';
import { Rect, Line, Ellipse, Image, Text } from 'react-konva';
import { EllipseType, ImageType, LineType, Palm, RectType, ShapeEnum, ShapeType } from '@tools';
import { canvasState, toolState } from '@store';
import Konva from 'konva';
import dynamic from 'next/dynamic';
import useImage from 'use-image';

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
      <Ellipse
        x={x}
        y={y}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
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

function UploadableImage({ id, url }: { url: string; id: number }) {
  const [image, status] = useImage(url);

  if (status === 'loading') {
    return <Text text="Loading image..." />;
  }

  if (status === 'failed') {
    return <Text text="Failed to load" />;
  }

  return <Image alt={`Uploaded image with ${id}`} image={image} />;
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
        isSelected={draggable ? id === selectedId : false}
        onSelect={() => handleSelect(id)}
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
        isSelected={id === selectedId}
        draggable={draggable ? id === selectedId : false}
        onSelect={() => handleSelect(id)}
      />
    );
  }
  if (shape.type === ShapeEnum.IMAGE) {
    return <UploadableImage id={shape.id} url={(shape as ImageType).src} />;
  }
});

export default Shape;
