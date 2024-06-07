'use client';
import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import { Stage, Layer } from 'react-konva';
import { canvasState, toolState } from '@store';
import { Palm } from '../_tools';

const Shape = dynamic(() => import('../_components/Shape'), {
  ssr: false,
});

export const Canvas = observer(function () {
  const [selectedId, setSelectedId] = useState(-1);

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
      canvasState.selectShape(-1);
      setSelectedId(-1);
    }
  }, [draggable]);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={toolState.tool?.onMouseDown}
      onMouseMove={toolState.tool?.onMouseMove}
      onMouseUp={toolState.tool?.onMouseUp}
    >
      <Layer>
        {canvasState.undoList.map((shape, i) => (
          <Shape
            isSelected={draggable ? shape.id === selectedId : false}
            draggable={draggable}
            onSelect={() => handleSelect(shape.id)}
            key={i}
            shape={shape}
          />
        ))}
      </Layer>
    </Stage>
  );
});

export default Canvas;
