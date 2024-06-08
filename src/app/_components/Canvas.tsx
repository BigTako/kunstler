'use client';
import React, { LegacyRef, useEffect, useRef } from 'react';

import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import { Stage, Layer } from 'react-konva';
import { canvasState, toolState } from '@store';
import { Palm } from '../_tools';
import Konva from 'konva';

const Shape = dynamic(() => import('../_components/Shape'), {
  ssr: false,
});

export const Canvas = observer(function () {
  const draggable = toolState.tool instanceof Palm;
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    if (!draggable) {
      canvasState.selectShape(-1);
    }
    canvasState.setStageRef(stageRef as LegacyRef<Konva.Stage>);
  }, [draggable]);

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={toolState.tool?.onMouseDown}
      onMouseMove={toolState.tool?.onMouseMove}
      onMouseUp={toolState.tool?.onMouseUp}
    >
      <Layer>
        {canvasState.undoList.map((shape, i) => (
          <Shape draggable={draggable} key={i} shape={shape} />
        ))}
      </Layer>
    </Stage>
  );
});

export default Canvas;
