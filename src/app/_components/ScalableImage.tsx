import React, { LegacyRef, useCallback, useEffect, useRef } from 'react';

import { observer } from 'mobx-react-lite';
import useImage from 'use-image';
import { canvasState } from '../_store';
import Konva from 'konva';
import { Image, Transformer } from 'react-konva';
import { ImageType } from '../_tools';

const ScalableImage = observer(function ({ shape, draggable }: { shape: ImageType; draggable: boolean }) {
  const { id, x, y, width, height, src, filters } = shape;
  const { blurRadius, brightness, contrast, noise, pixelate } = filters;

  const [image] = useImage(src, 'anonymous');
  const imageRef = useRef<Konva.Image>();
  const trRef = useRef<Konva.Transformer>(null);

  const isSelected = id === canvasState.selectedShapeId;

  useEffect(() => {
    if (isSelected) {
      if (trRef.current) {
        const tr = trRef.current;
        tr.nodes([imageRef.current as Konva.Image]);
        tr.getLayer()?.batchDraw();
      }
    }
  }, [isSelected]);

  const handleSelect = useCallback(
    (id: number) => {
      if (isSelected) {
        canvasState.selectShape(-1);
      } else {
        canvasState.selectShape(id);
      }
    },
    [isSelected],
  );

  useEffect(() => {
    if (image) {
      if (imageRef.current) {
        imageRef.current.cache();
      }
    }
  }, [image]);

  return (
    <>
      <Image
        alt={`Uploaded image with ${id}`}
        draggable={draggable}
        onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
          canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as ImageType);
        }}
        ref={imageRef as LegacyRef<Konva.Image>}
        x={x}
        y={y}
        onClick={() => handleSelect(id)}
        width={width}
        height={height}
        image={image}
        filters={[
          Konva.Filters.Blur,
          Konva.Filters.Brighten,
          Konva.Filters.Contrast,
          Konva.Filters.Noise,
          Konva.Filters.Pixelate,
        ]}
        blurRadius={blurRadius}
        brightness={brightness}
        contrast={contrast}
        noise={noise}
        pixelSize={pixelate <= 0 ? 0.00001 : pixelate}
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
    </>
  );
});

export default ScalableImage;
