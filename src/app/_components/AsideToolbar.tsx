'use client';

import React, { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BsAspectRatio, BsCrop, BsPalette } from 'react-icons/bs';
import { SquareButton } from '@components';
import { canvasState, toolState } from '@store';
import { cn } from '@/utils/cn';
import { ImageProcessingMode, ImageTool, ImageType, ShapeEnum } from '../_tools';

function ColorInput({
  id,
  className,
  onChange,
  defaultValue,
}: {
  id: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
}) {
  return (
    <input
      type="color"
      id={id}
      defaultValue={defaultValue}
      onChange={onChange}
      className={cn(
        'box-border h-[30px] w-[30px] cursor-pointer rounded-md border-none outline outline-1 outline-offset-2 outline-primary-900',
        className,
      )}
    />
  );
}

export function MobileAsideToolbar() {
  const [isToolbarOpened, setIsToolbarOpened] = useState(false);
  return (
    <div className="absolute bottom-10 right-1/2 flex translate-x-1/2 flex-col gap-3 rounded-lg bg-primary-50 p-3 shadow-sm md:hidden">
      <SquareButton title="Paramters" onClick={() => setIsToolbarOpened(v => !v)}>
        <BsPalette />
      </SquareButton>
      {isToolbarOpened && (
        <aside className="absolute bottom-20 right-1/2 flex translate-x-1/2 flex-col gap-3 rounded-lg bg-primary-50 p-3 shadow-sm">
          <Toolbar />
        </aside>
      )}
    </div>
  );
}

const imageProcessingOptions = [
  {
    title: 'Resize',
    icon: <BsAspectRatio />,
    selectable: true,
    onClick: () => {
      const tool = toolState.tool;
      if (tool && tool instanceof ImageTool) {
        tool.setMode(ImageProcessingMode.RESIZE);
      }
    },
  },
  {
    title: 'Crop',
    icon: <BsCrop />,
    selectable: true,
    onClick: () => {
      const tool = toolState.tool;
      if (tool && tool instanceof ImageTool) {
        tool.setMode(ImageProcessingMode.CROP);
      }
    },
  },
];

const Toolbar = observer(function ({ className }: { className?: string }) {
  const [selectedOption, setSelectedOption] = useState('Resize');

  const handleStrokeColorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => toolState.setStrokeColor(e.target.value),
    [],
  );

  const handleFillColorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => toolState.setFillColor(e.target.value),
    [],
  );

  const handleLineWidthChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => toolState.setLineWidth(Number(e.target.value)),
    [],
  );

  return (
    <aside className={cn('flex flex-col gap-3 rounded-lg bg-primary-50 p-3 shadow-sm', className)}>
      <div className="flex justify-between">
        <label htmlFor="stroke-color-input" className="inline-flex items-center">
          Stroke color
        </label>
        <ColorInput id="stroke-color-input" onChange={handleStrokeColorChange} defaultValue={toolState.strokeColor} />
      </div>
      <div className="flex justify-between">
        <label htmlFor="color-input" className="inline-flex items-center">
          Background color
        </label>
        <ColorInput id="background-color-input" onChange={handleFillColorChange} defaultValue={toolState.fillColor} />
      </div>
      <div className="flex flex-col justify-between">
        <label htmlFor="color-input" className="inline-flex items-center">
          Line width
        </label>
        <input
          type="range"
          id="lint-width-input"
          name="lint-width-input"
          className="cursor-pointer"
          min="1"
          max="50"
          onChange={handleLineWidthChange}
          defaultValue={toolState.lineWidth}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="inline-flex items-center">Image processing</label>
        <div className="flex gap-3">
          {imageProcessingOptions.map(({ title, icon, onClick, selectable }) => (
            <SquareButton
              key={title}
              title={title}
              className={cn(
                'md:h-[40px] md:w-[40px]',
                selectable && selectedOption === title ? 'bg-secondary-200' : 'bg-secondary-100',
              )}
              onClick={() => {
                onClick?.();
                setSelectedOption(title);
              }}
            >
              {icon}
            </SquareButton>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <label htmlFor="color-input" className="inline-flex items-center">
          Image crop width
        </label>
        <input
          type="range"
          id="image-crop-width-input"
          name="image-crop-width-input"
          className="cursor-pointer"
          min="100"
          max="1000"
          onChange={e => {
            const shape = canvasState.getShape(canvasState.selectedShapeId);

            if (shape && shape.type === ShapeEnum.IMAGE) {
              canvasState.updateShape(canvasState.selectedShapeId, {
                cropWidth: Number(e.target.value),
              } as ImageType);
            }
          }}
          defaultValue={10}
        />
      </div>
      <div className="flex flex-col justify-between">
        <label htmlFor="color-input" className="inline-flex items-center">
          Image crop height
        </label>
        <input
          type="range"
          id="image-crop-height-input"
          name="image-crop-height-input"
          className="cursor-pointer"
          min="100"
          max="1000"
          onChange={e => {
            const shape = canvasState.getShape(canvasState.selectedShapeId);

            if (shape && shape.type === ShapeEnum.IMAGE) {
              canvasState.updateShape(canvasState.selectedShapeId, {
                cropHeight: Number(e.target.value),
              } as ImageType);
            }
          }}
          defaultValue={10}
        />
      </div>
      <div className="flex flex-col justify-between">
        <label htmlFor="color-input" className="inline-flex items-center">
          Image crop x
        </label>
        <input
          type="range"
          id="image-crop-x-input"
          name="image-crop-x-input"
          className="cursor-pointer"
          min="100"
          max="1000"
          onChange={e => {
            const shape = canvasState.getShape(canvasState.selectedShapeId);

            if (shape && shape.type === ShapeEnum.IMAGE) {
              canvasState.updateShape(canvasState.selectedShapeId, {
                cropX: Number(e.target.value),
              } as ImageType);
            }
          }}
          defaultValue={10}
        />
      </div>
      <div className="flex flex-col justify-between">
        <label htmlFor="color-input" className="inline-flex items-center">
          Image crop y
        </label>
        <input
          type="range"
          id="image-crop-y-input"
          name="image-crop-y-input"
          className="cursor-pointer"
          min="100"
          max="1000"
          onChange={e => {
            const shape = canvasState.getShape(canvasState.selectedShapeId);

            if (shape && shape.type === ShapeEnum.IMAGE) {
              canvasState.updateShape(canvasState.selectedShapeId, {
                cropY: Number(e.target.value),
              } as ImageType);
            }
          }}
          defaultValue={10}
        />
      </div>
    </aside>
  );
});

export function AsideToolbar() {
  const [isToolbarOpened, setIsToolbarOpened] = useState(false);
  return (
    <>
      <div className="absolute bottom-1/2 left-5 hidden md:flex">
        <Toolbar />
      </div>
      <div className="absolute bottom-10 right-1/2 flex translate-x-1/2 flex-col gap-3 rounded-lg bg-primary-50 p-2 shadow-sm md:hidden">
        <SquareButton title="Paramters" onClick={() => setIsToolbarOpened(v => !v)}>
          <BsPalette />
        </SquareButton>
        {isToolbarOpened && (
          <div className="absolute bottom-20 right-1/2 translate-x-1/2">
            <Toolbar />
          </div>
        )}
      </div>
    </>
  );
}
