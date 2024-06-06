import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { Rect, Line, Ellipse, Image } from 'react-konva';
import { EllipseType, ImageTool, ImageType, LineType, Palm, RectType, ShapeEnum, ShapeType } from '@tools';
import { canvasState, toolState } from '@store';
import Konva from 'konva';
import dynamic from 'next/dynamic';
import useImage from 'use-image';
// import { Shape, ShapeConfig } from 'konva/lib/Shape';

const Transformable = dynamic(() => import('./Transformable'), { ssr: false });

interface TransformableRectProps {
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

function TransformableRect(props: TransformableRectProps) {
  const { id, x, y, stroke, strokeWidth, fill, width, height, draggable, ...TransformableProps } = props;

  return (
    <Transformable
      {...TransformableProps}
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
    </Transformable>
  );
}

interface TransformableEllipseProps {
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

function TransformableEllipse(props: TransformableEllipseProps) {
  const { id, x, y, stroke, strokeWidth, fill, radiusX, radiusY, draggable, ...TransformableProps } = props;
  return (
    <Transformable
      {...TransformableProps}
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
    </Transformable>
  );
}

interface TransformableImageProps {
  id: number;
  isSelected: boolean;
  onSelect: () => void;
  x: number;
  y: number;
  width: number;
  height: number;
  cropX: number;
  cropY: number;
  cropWidth: number;
  cropHeight: number;
  src: string;
  draggable: boolean;
}

function TransformableImage(props: TransformableImageProps) {
  const { id, x, y, height, width, draggable, cropX, cropY, cropHeight, cropWidth, src, ...TransformableProps } = props;

  const [image, status] = useImage(src);

  if (status !== 'loaded') {
    return null;
  }

  const handleScale = (node: Konva.Shape) => {
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const scaledWidth = Math.max(5, node.width() * scaleX);
    const scaledHeight = Math.max(5, node.height() * scaleY);
    canvasState.updateShape(id, {
      x: node.x(),
      y: node.y(),
      width: scaledWidth,
      height: scaledHeight,
    } as ImageType);
  };

  const handleCrop = (node: Konva.Shape) => {
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const scaledWidth = Math.max(5, node.width() * scaleX);
    const scaledHeight = Math.max(5, node.height() * scaleY);

    const cropX = Math.max(0, node.x() - x);
    const cropY = Math.max(0, node.y() - y);
    const cropWidth = Math.min(width, scaledWidth);
    const cropHeight = Math.min(height, scaledHeight);

    canvasState.updateShape(id, {
      cropX,
      cropY,
      cropWidth,
      cropHeight,
    } as ImageType);
  };

  console.log({ cropX, cropY, cropWidth, cropHeight });

  return (
    <Transformable
      {...TransformableProps}
      scale={node => {
        handleScale(node);
      }}
    >
      <Image
        draggable={draggable}
        onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
          canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as EllipseType);
        }}
        x={x}
        y={y}
        crop={{ x: cropX, y: cropY, width: cropWidth, height: cropHeight }}
        width={width}
        height={height}
        alt={`Uploaded image with ${id}`}
        image={image}
      />
    </Transformable>
  );
}

const Shape = observer(function ({ shape }: { shape: ShapeType }) {
  const [selectedId, setSelectedId] = React.useState(-1);

  const handleSelect = (id: number) => {
    if (selectedId === id) {
      canvasState.setSelectedShape(-1);
      setSelectedId(-1);
    } else {
      canvasState.setSelectedShape(id);
      setSelectedId(id);
    }
  };

  // console.log({ selectedShape: canvasState.selectedShapeId });

  const draggable = toolState.tool instanceof Palm;

  useEffect(() => {
    if (!draggable) {
      setSelectedId(-1);
    }
  }, [draggable]);

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
      <TransformableRect
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
      <TransformableEllipse
        id={id}
        x={x}
        y={y}
        radiusX={radiusX}
        radiusY={radiusY}
        fill={fillColor}
        stroke={strokeColor as string}
        strokeWidth={strokeWidth as number}
        draggable={draggable ? id === selectedId : false}
        isSelected={id === selectedId}
        onSelect={() => handleSelect(id)}
      />
    );
  }
  if (shape.type === ShapeEnum.IMAGE) {
    const { id, x, y, width, height, cropX, cropY, cropHeight, cropWidth, src } = shape as ImageType;
    return (
      <TransformableImage
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        cropX={cropX}
        cropY={cropY}
        cropHeight={cropHeight}
        cropWidth={cropWidth}
        src={src}
        draggable={draggable ? id === selectedId : false}
        isSelected={selectedId === id}
        onSelect={() => handleSelect(id)}
      />
    );
  }
});

export default Shape;
