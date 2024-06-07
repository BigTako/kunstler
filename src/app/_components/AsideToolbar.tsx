'use client';

import { cn } from '@/utils/cn';
import React, { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';
import { BsPalette } from 'react-icons/bs';
import { SquareButton } from '@components';
import { observer } from 'mobx-react-lite';
import { canvasState, toolState } from '@store';
import { ImageType, ShapeEnum } from '../_tools';

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

function RangeInput({
  label,
  defaultValue,
  min,
  max,
  onChange,
}: {
  label: string;
  defaultValue: number | string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="flex flex-col justify-between">
      <label htmlFor="color-input" className="inline-flex items-center">
        {label}
      </label>
      <input
        type="range"
        id="lint-width-input"
        name="lint-width-input"
        className="cursor-pointer"
        min={min}
        max={max}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
}

function ImageFiltersMenuToolbar() {
  const selectedShape = canvasState.selectedShape as ImageType;
  const isImageSelected = selectedShape?.type === ShapeEnum.IMAGE;

  const handleBlurRadiusChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // const tool = toolState.tool;
      if (isImageSelected) {
        canvasState.updateShape(selectedShape.id, { blurRadius: Number(e.target.value) } as ImageType);
      }
    },
    [isImageSelected, selectedShape?.id],
  );

  return (
    <div className="flex flex-col gap-3">
      <RangeInput
        min={0}
        max={20}
        label="Image blur radius"
        onChange={handleBlurRadiusChange}
        defaultValue={selectedShape?.blurRadius ?? 0}
      />
    </div>
  );
}

const Toolbar = observer(function ({ className }: { className?: string }) {
  // const tool = toolState.tool;
  const selectedShape = canvasState.selectedShape;
  const openImageToolbar = selectedShape && selectedShape.type === ShapeEnum.IMAGE;

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
      <RangeInput
        min={1}
        max={50}
        label="Line width"
        onChange={handleLineWidthChange}
        defaultValue={toolState.lineWidth}
      />
      {openImageToolbar && <ImageFiltersMenuToolbar />}
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
