'use client';

import Konva from 'konva';
import React, { LegacyRef, ReactElement, ReactNode, cloneElement, useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';

function Transformable<T extends Konva.Shape>({
  isSelected,
  onSelect,
  scale,
  children,
}: {
  children: ReactNode;
  isSelected: boolean;
  onSelect: () => void;
  scale: (node: T) => void;
}) {
  const shapeRef = useRef<T>(null);
  const trRef = useRef<Konva.Transformer>(null);

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
        onClick: onSelect,
        onTap: onSelect,
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
}

export default Transformable;
