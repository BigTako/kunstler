'use client';

import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { canvasState, toolState } from '@store';
import { Brush } from '@tools';

export const Canvas = observer(function (props: object) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;

      canvasState.setCanvas(canvasRef.current);
      toolState.setTool(new Brush(canvasRef.current));
    }
  }, []);

  return <canvas className="z-[-1]" ref={canvasRef} {...props} />;
});
