import React, { LegacyRef, useEffect, useRef } from 'react';

import { observer } from 'mobx-react-lite';
import { Line, Image } from 'react-konva';
import { EllipseType, ImageType, LineType, Palm, RectType, ShapeEnum, ShapeType } from '@tools';
import { canvasState, toolState } from '@store';
import Konva from 'konva';
import dynamic from 'next/dynamic';
import useImage from 'use-image';

// const Scalable = dynamic(() => import('./Scalable'), { ssr: false });
const ScalableRect = dynamic(() => import('./ScalableRect'), { ssr: false });
const ScalableEllipse = dynamic(() => import('./ScalableEllipse'), { ssr: false });

// function ScalableImage(props: ScalableImageProps) {
//   const { id, x, y, height, width, draggable, src, ...scalableProps } = props;

//   const [image, status] = useImage(src);

//   if (status !== 'loaded') {
//     return null;
//   }

//   return (
//     <Scalable
//       {...scalableProps}
//       scale={node => {
//         const scaleX = node.scaleX();
//         const scaleY = node.scaleY();
//         const scaledWidth = Math.max(5, node.width() * scaleX);
//         const scaledHeight = Math.max(5, node.height() * scaleY);
//         canvasState.updateShape(id, {
//           x: node.x(),
//           y: node.y(),
//           width: scaledWidth,
//           height: scaledHeight,
//         } as ImageType);
//       }}
//     >
//       <Image
//         draggable={draggable}
// onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
//   canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as EllipseType);
// }}
//         x={x}
//         y={y}
//         width={width}
//         height={height}
//         alt={`Uploaded image with ${id}`}
//         image={image}
//       />
//     </Scalable>
//   );
// }

interface ScalableImageProps {
  id: number;
  // isSelected: boolean;
  // onSelect: () => void;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  draggable: boolean;
}

function FilterImage(props: ScalableImageProps) {
  // const { id, x, y, width, height, src, draggable, isSelected, onSelect } = props;
  const { id, x, y, width, height, draggable, src } = props;

  const [image] = useImage(src, 'anonymous');
  const imageRef = useRef<Konva.Image>();

  // when image is loaded we need to cache the shape
  React.useEffect(() => {
    if (image) {
      // you many need to reapply cache on some props changes like shadow, stroke, etc.
      if (imageRef.current) {
        imageRef.current.cache();
      }
    }
  }, [image]);

  return (
    <Image
      alt={`Uploaded image with ${id}`}
      draggable={draggable}
      onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
        canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as EllipseType);
      }}
      ref={imageRef as LegacyRef<Konva.Image>}
      x={x}
      y={y}
      width={width}
      height={height}
      image={image}
      filters={[Konva.Filters.Blur]}
      blurRadius={10}
    />
  );
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
        draggable={draggable ? id === selectedId : false}
        isSelected={id === selectedId}
        onSelect={() => handleSelect(id)}
      />
    );
  }
  if (shape.type === ShapeEnum.IMAGE) {
    const { id, x, y, width, height, src } = shape as ImageType;
    return <FilterImage id={id} x={x} y={y} height={height} width={width} src={src} draggable={draggable} />;
  }
});

export default Shape;
