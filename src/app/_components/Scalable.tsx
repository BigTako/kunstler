'use client';

import Konva from 'konva';
import React, { LegacyRef, ReactElement, ReactNode, cloneElement, useCallback, useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import { canvasState } from '../_store';
import { observer } from 'mobx-react-lite';

const Scalable = observer(function <T extends Konva.Shape>({
  shapeId,
  scale,
  children,
}: {
  shapeId: number;
  children: ReactNode;
  scale: (node: T) => void;
}) {
  const shapeRef = useRef<T>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const isSelected = shapeId === canvasState.selectedShape?.id;

  const handleSelect = useCallback(
    (id: number) => {
      if (isSelected) {
        canvasState.selectShape(-1);
        // setSelectedId(-1);
      } else {
        canvasState.selectShape(id);
        // setSelectedId(id);
      }
    },
    [isSelected, shapeId],
  );

  useEffect(() => {
    if (isSelected) {
      if (trRef.current) {
        const tr = trRef.current;
        tr.nodes([shapeRef.current as T]);
        tr.getLayer()?.batchDraw();
      }
    }
  }, [isSelected]);

  return (
    <>
      {cloneElement(children as ReactElement, {
        onClick: () => handleSelect(shapeId),
        onTap: () => handleSelect(shapeId),
        // onClick: onSelect,
        // onTap: onSelect,
        ref: shapeRef as LegacyRef<T>,
        onTransformEnd: () => {
          const node = shapeRef.current;
          if (node) {
            scale(node);
            node.scaleX(1);
            node.scaleY(1);
          }
        },
      })}
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
    </>
  );
});

export default Scalable;
