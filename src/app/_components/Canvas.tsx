'use client';
import React from 'react';

import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import { Stage, Layer } from 'react-konva';
import { canvasState, toolState } from '@store';

const Shape = dynamic(() => import('../_components/Shape'), {
  ssr: false,
});

export const Canvas = observer(function () {
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
          <Shape key={i} shape={shape} />
        ))}
      </Layer>
    </Stage>
  );
});

export default Canvas;
