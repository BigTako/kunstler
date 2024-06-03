'use client';
import React from 'react';

import { observer } from 'mobx-react-lite';
import { Stage, Layer, Line } from 'react-konva';
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
      <Layer>
        {(toolState.tool as Brush)?.lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="#df4b26"
            strokeWidth={5}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        ))}
      </Layer>
    </Stage>
  );
});

export default Canvas;
