import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { Line } from 'react-konva';
import { EllipseType, LineType, Palm, RectType, ShapeEnum, ShapeType } from '@tools';
import { canvasState, toolState } from '@store';
import dynamic from 'next/dynamic';

const ScalableRect = dynamic(() => import('./ScalableRect'), { ssr: false });
const ScalableEllipse = dynamic(() => import('./ScalableEllipse'), { ssr: false });

const Shape = observer(function ({ shape }: { shape: ShapeType }) {
  const [selectedId, setSelectedId] = React.useState(-1);

  const handleSelect = (id: number) => {
    if (selectedId === id) {
      canvasState.selectShape(-1);
      setSelectedId(-1);
    } else {
      canvasState.selectShape(id);
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
    // const { id, x, y, width, height, src } = shape as ImageType;
    // return (
    //   <ScalableImage
    //     id={id}
    //     x={x}
    //     y={y}
    //     width={width}
    //     height={height}
    //     src={src}
    //     draggable={draggable ? id === selectedId : false}
    //     isSelected={selectedId === id}
    //     onSelect={() => handleSelect(id)}
    //   />
    // );
  }
});

export default Shape;
