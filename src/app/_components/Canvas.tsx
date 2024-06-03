'use client';
import React from 'react';

import { observer } from 'mobx-react-lite';
import { Stage, Layer } from 'react-konva';
import { canvasState, toolState } from '@store';

export const Canvas = observer(function () {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={toolState.tool?.onMouseDown}
      onMouseMove={toolState.tool?.onMouseMove}
      onMouseUp={toolState.tool?.onMouseUp}
    >
      <Layer>{canvasState.shapes.map((shape, i) => toolState.tool?.draw(shape, i))}</Layer>
    </Stage>
  );
});

export default Canvas;
