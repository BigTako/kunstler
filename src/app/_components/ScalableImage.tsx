import React, { LegacyRef, useCallback, useEffect, useRef, useState } from 'react';

import { observer } from 'mobx-react-lite';
import useImage from 'use-image';
import { canvasState } from '@store';
import Konva from 'konva';
import { Group, Image, Transformer } from 'react-konva';
import { ImageType } from '@tools';
import { Filter } from 'konva/lib/Node';
import { Shape as KonvaShape, ShapeConfig as KonvaShapeConfig } from 'konva/lib/Shape';

const ScalableImage = observer(function ({ shape, draggable }: { shape: ImageType; draggable: boolean }) {
  const { id, x, y, width, height, src, filters } = shape;
  const { blurRadius, brightness, contrast, noise, pixelate, grayscale, invert } = filters;
  const [imageFilters, setImageFilters] = useState<Filter[]>([
    Konva.Filters.Blur,
    Konva.Filters.Brighten,
    Konva.Filters.Contrast,
    Konva.Filters.Noise,
    Konva.Filters.Pixelate,
  ]);

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
        imageRef.current.clearCache();
        imageRef.current.cache({ pixelRatio: 0.5 });
      }
    }
  }, [image]);

  const handleFilter = useCallback((filter: Filter, condition: boolean) => {
    setImageFilters(filters => {
      if (condition) {
        return [...filters, filter];
      } else {
        return filters.filter(f => f !== filter);
      }
    });
  }, []);

  const handleScale = useCallback(
    (node: KonvaShape<KonvaShapeConfig>) => {
      console.log('handle scale');
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
      node.scaleX(1);
      node.scaleY(1);
    },
    [id],
  );

  useEffect(() => {
    handleFilter(Konva.Filters.Grayscale, grayscale);
    handleFilter(Konva.Filters.Invert, invert);
  }, [handleFilter, grayscale, invert]);

  return (
    <>
      <Group
        onTransformEnd={() => {
          const node = imageRef.current;
          if (node) {
            handleScale(node);
          }
        }}
      >
        <Image
          alt={`Uploaded image with ${id}`}
          x={x}
          y={y}
          width={width}
          height={height}
          image={image}
          ref={imageRef as LegacyRef<Konva.Image>}
          draggable={draggable}
          onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) => {
            canvasState.updateShape(id, { x: e.target.x(), y: e.target.y() } as ImageType);
          }}
          onClick={() => handleSelect(id)}
          filters={imageFilters}
          blurRadius={blurRadius}
          brightness={brightness}
          contrast={contrast}
          noise={noise}
          pixelSize={pixelate <= 0 ? 0.00001 : pixelate}
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef as LegacyRef<Konva.Transformer>}
          flipEnabled={true}
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
