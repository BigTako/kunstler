'use client';
import React from 'react';

import { observer } from 'mobx-react-lite';
import { Stage, Layer } from 'react-konva';
import { toolState } from '@store';
import { Brush } from '@tools';

export const Canvas = observer(function () {
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={toolState.tool?.onMouseDown}
      onMouseMove={toolState.tool?.onMouseMove}
      onMouseUp={toolState.tool?.onMouseUp}
    >
      <Layer>{(toolState.tool as Brush)?.lines.map((line, i) => toolState.tool?.draw(line, i))}</Layer>
    </Stage>
  );
});

export default Canvas;
