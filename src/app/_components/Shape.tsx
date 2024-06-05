import React, { LegacyRef } from 'react';

import { observer } from 'mobx-react-lite';
import { Rect, Line, Transformer, Ellipse } from 'react-konva';
import { EllipseType, LineType, Palm, RectType, ShapeEnum, ShapeType } from '@tools';
import { canvasState, toolState } from '@store';
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
  onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
}

const Rectangle = (props: ScalableRectProps) => {
  const { id, isSelected, onSelect, x, y, stroke, strokeWidth, fill, width, height, draggable, onDragEnd } = props;
  const shapeRef = React.useRef<Konva.Rect>(null);
  const trRef = React.useRef<Konva.Transformer>(null);

  React.useEffect(() => {
    if (isSelected) {
      if (trRef.current) {
        const tr = trRef.current;
        tr.nodes([shapeRef.current as Konva.Rect]);
        tr.getLayer()?.batchDraw();
      }
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        x={x}
        y={y}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        width={width}
        height={height}
        onClick={onSelect}
        onTap={onSelect}
        draggable={draggable}
        onDragEnd={onDragEnd}
        ref={shapeRef as LegacyRef<Konva.Rect>}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            canvasState.updateShape(id, {
              x: node.x(),
              y: node.y(),
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            } as RectType);
          }
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef as LegacyRef<Konva.Transformer>}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

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
  onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
}

const ScalableEllipse = (props: ScalableEllipseProps) => {
  const { id, isSelected, onSelect, x, y, stroke, strokeWidth, fill, radiusX, radiusY, onDragEnd, draggable } = props;
  const shapeRef = React.useRef<Konva.Ellipse>(null);
  const trRef = React.useRef<Konva.Transformer>(null);

  React.useEffect(() => {
    if (isSelected) {
      if (trRef.current) {
        const tr = trRef.current;
        tr.nodes([shapeRef.current as Konva.Ellipse]);
        tr.getLayer()?.batchDraw();
      }
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Ellipse
        x={x}
        y={y}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        radiusX={radiusX}
        radiusY={radiusY}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef as LegacyRef<Konva.Ellipse>}
        draggable={draggable}
        onDragEnd={onDragEnd}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            canvasState.updateShape(id, {
              x: node.x(),
              y: node.y(),
              radiusX: (node.width() * scaleX) / 2,
              radiusY: (node.height() * scaleY) / 2,
            } as EllipseType);
          }
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef as LegacyRef<Konva.Transformer>}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

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
      <Rectangle
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor as string}
        stroke={strokeColor as string}
        strokeWidth={strokeWidth as number}
        draggable={draggable}
        isSelected={id === selectedId}
        onSelect={() => handleSelect(id)}
        onDragEnd={e => {
          canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as RectType);
        }}
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
        draggable={draggable}
        onDragEnd={e => {
          canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as EllipseType);
        }}
        isSelected={id === selectedId}
        onSelect={() => handleSelect(id)}
      />
    );
  }
});

export default Shape;
