'use client';

import React, { useRef } from 'react';

export default function Canvas(props: object) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return <canvas className="z-[-1] h-full w-full" ref={canvasRef} {...props} />;
}
