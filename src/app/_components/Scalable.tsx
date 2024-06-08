'use client';

import Konva from 'konva';
import React, { LegacyRef, ReactElement, ReactNode, cloneElement, useCallback, useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import { canvasState, toolState } from '@store';
import { observer } from 'mobx-react-lite';
import { Palm } from '@tools';

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

  const isSelected = shapeId === canvasState.selectedShapeId;

  const isSelectable = toolState.tool instanceof Palm;

  const handleSelect = useCallback(
    (id: number) => {
      console.log({ isSelectable });
      if (!isSelectable) return;
      if (isSelected) {
        canvasState.selectShape(-1);
      } else {
        canvasState.selectShape(id);
      }
    },
    [isSelected, isSelectable],
  );

  useEffect(() => {
    if (isSelected) {
      if (trRef.current) {
        const tr = trRef.current;
        tr.nodes([shapeRef.current as T]);
        tr.getLayer()?.batchDraw();
      }
    }
  }, [isSelected, shapeRef]);

  return (
    <>
      {cloneElement(children as ReactElement, {
        onClick: () => handleSelect(shapeId),
        onTap: () => handleSelect(shapeId),
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
