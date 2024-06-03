'use client';

import { observer } from 'mobx-react-lite';
import { Stage, Layer, Line, Text } from 'react-konva';
import React from 'react';
import { makeAutoObservable } from 'mobx';
import { KonvaEventObject } from 'konva/lib/Node';

interface LineType {
  points: number[];
}

class Brush {
  lines: LineType[];
  isDrawing: boolean;
  constructor() {
    makeAutoObservable(this, {}, { deep: true });
    this.isDrawing = false;
    this.lines = [];
  }

  handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    this.isDrawing = true;
    // console.log('mousedown');
    const stage = e.target.getStage();
    if (stage) {
      const pos = stage.getPointerPosition();
      if (pos) {
        this.lines = [...this.lines, { points: [pos.x, pos.y] }];
      }
    }
  };

  handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    // no drawing - skipping
    if (!this.isDrawing) {
      return;
    }
    const stage = e.target.getStage();
    // console.log('drawing');
    if (stage) {
      const point = stage.getPointerPosition();
      let lastLine = this.lines[this.lines.length - 1];
      // add point
      if (point) {
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        this.lines.splice(this.lines.length - 1, 1, lastLine);
        this.lines = this.lines.concat();
      }
    }
  };

  handleMouseUp = () => {
    // console.log({ lines: this.lines });
    this.isDrawing = false;
  };
}



export const Canvas = observer(function (props: object) {
  // const [lines, setLines] = React.useState<LineType[]>([]);
  // const isDrawing = React.useRef(false);

  // const handleMouseDown = e => {
  //   isDrawing.current = true;
  //   const pos = e.target.getStage().getPointerPosition();
  //   setLines([...lines, { points: [pos.x, pos.y] }]);
  // };

  // const handleMouseMove = e => {
  //   // no drawing - skipping
  //   if (!isDrawing.current) {
  //     return;
  //   }
  //   const stage = e.target.getStage();
  //   const point = stage.getPointerPosition();
  //   let lastLine = lines[lines.length - 1];
  //   // add point
  //   lastLine.points = lastLine.points.concat([point.x, point.y]);

  //   // replace last
  //   lines.splice(lines.length - 1, 1, lastLine);
  //   setLines(lines.concat());
  // };

  // const handleMouseUp = () => {
  //   isDrawing.current = false;
  // };

  const brush = new Brush();

  console.log({ lines: brush.lines });
  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={brush.handleMouseDown}
      onMousemove={brush.handleMouseMove}
      onMouseup={brush.handleMouseUp}
    >
      <Layer>
        <Text text="Just start drawing" x={5} y={30} />
        {brush.lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="#df4b26"
            strokeWidth={5}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
          />
        ))}
      </Layer>
    </Stage>
  );
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // useEffect(() => {
  //   if (canvasRef.current) {
  //     canvasRef.current.width = window.innerWidth;
  //     canvasRef.current.height = window.innerHeight;
  //     canvasState.setCanvas(canvasRef.current);
  //     toolState.setTool(new Brush(canvasRef.current));
  //   }
  // }, []);
  // return <canvas className="z-[-1]" ref={canvasRef} {...props} />;
});

export default Canvas;
// export default function Canvas(props: object) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   return <canvas className="z-[-1] h-full w-full" ref={canvasRef} {...props} />;
// }
