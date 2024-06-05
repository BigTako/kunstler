import React, { LegacyRef } from 'react';

import { observer } from 'mobx-react-lite';
import { Rect, Line, Circle, Transformer } from 'react-konva';
import { CircleType, LineType, Palm, RectType, ShapeEnum, ShapeType } from '@tools';
import { canvasState, toolState } from '@store';
import Konva from 'konva';

const Rectangle = ({
  id,
  isSelected,
  onSelect,
  ...props
}: {
  id: number;
  isSelected: boolean;
  onSelect: () => void;
  pros: object;
}) => {
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
        {...props}
        onClick={onSelect}
        onTap={onSelect}
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
        //@ts-ignore
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        draggable={draggable}
        isSelected={id === selectedId}
        onSelect={() => handleSelect(id)}
      />
    );
  }
  if (shape.type === ShapeEnum.CIRCLE) {
    let { id, x, y, radius, fillColor, strokeColor, lineWidth: strokeWidth } = shape as CircleType;
    return (
      <Circle
        x={x}
        y={y}
        radius={radius}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        draggable={draggable}
        onDragEnd={e => {
          canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as CircleType);
        }}
      />
    );
  }
});

export default Shape;
