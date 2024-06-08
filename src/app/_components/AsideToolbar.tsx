'use client';

import { cn } from '@/utils/cn';
import React, { ChangeEvent, ChangeEventHandler, use, useCallback, useEffect, useState } from 'react';
import { BsPalette } from 'react-icons/bs';
import { SquareButton } from '@components';
import { observer } from 'mobx-react-lite';
import { canvasState, toolState } from '@store';
import { ImageFilterType, ImageType, ShapeEnum } from '@tools';

function ColorInput({
  id,
  className,
  onChange,
  value,
}: {
  id: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
}) {
  return (
    <input
      type="color"
      id={id}
      value={value}
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
  id,
  label,
  value,
  min,
  max,
  step = '1',
  onChange,
}: {
  id: string;
  label: string;
  value: number | string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  step?: string;
  min: number;
  max: number;
}) {
  return (
    <div className="flex flex-col justify-between">
      <label htmlFor={id} className="inline-flex items-center">
        {label}
      </label>
      <input
        type="range"
        id={id}
        name={id}
        className="cursor-pointer"
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

function CheckboxInput({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <label htmlFor={id} className="inline-flex">
        {label}
      </label>
      <input type="checkbox" checked={checked} id={id} name={id} className="cursor-pointer" onChange={onChange} />
    </div>
  );
}

const ImageFiltersMenuToolbar = observer(function ImageFiltersMenuToolbar() {
  const currentShape = canvasState.selectedShapeId;

  const { filters } = canvasState.getShape(canvasState.selectedShapeId) as ImageType;

  const handleFilterChange = useCallback(
    (newFilters: Partial<ImageFilterType>) => {
      canvasState.updateShape(currentShape, {
        filters: { ...filters, ...newFilters },
      } as ImageType);
    },
    [currentShape, filters],
  );

  if (!currentShape || currentShape < 0) {
    return null;
  }

  const { blurRadius, brightness, contrast, noise, pixelate } = filters;

  return (
    <div className="flex flex-col gap-3">
      <RangeInput
        id="blur-radius-input"
        min={0}
        max={20}
        label="Blur radius"
        onChange={e => handleFilterChange({ blurRadius: Number(e.target.value) })}
        value={blurRadius ?? 0}
      />
      <RangeInput
        id="brightness-input"
        min={-1}
        max={1}
        label="Brightness"
        step="0.01"
        onChange={e => handleFilterChange({ brightness: Number(e.target.value) })}
        value={brightness ?? 0}
      />
      <RangeInput
        id="contrast-input"
        min={-100}
        max={100}
        label="Contrast"
        onChange={e => handleFilterChange({ contrast: Number(e.target.value) })}
        value={contrast ?? 0}
      />
      <RangeInput
        id="noise-input"
        min={0}
        max={2}
        step="0.01"
        label="Noise"
        onChange={e => handleFilterChange({ noise: Number(e.target.value) })}
        value={noise ?? 0}
      />
      <RangeInput
        id="pixelate-input"
        min={0}
        max={10}
        step="0.01"
        label="Pixelate"
        onChange={e => handleFilterChange({ pixelate: Number(e.target.value) })}
        value={pixelate ?? 0}
      />
      <CheckboxInput
        id="grayscale-enabled-input"
        label="Grayscale"
        onChange={e => handleFilterChange({ grayscale: e.target.checked })}
        checked={filters.grayscale}
      />
      <CheckboxInput
        id="inversion-enabled-input"
        label="Invert"
        onChange={e => handleFilterChange({ invert: e.target.checked })}
        checked={filters.invert}
      />
    </div>
  );
});

const Toolbar = observer(function ({ className }: { className?: string }) {
  const selectedShape = canvasState.selectedShape();
  const openImageToolbar = selectedShape && selectedShape.type === ShapeEnum.IMAGE;

  const handleStrokeColorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (selectedShape) {
        canvasState.updateShape(selectedShape.id, {
          strokeColor: e.target.value,
        });
      }
      toolState.setStrokeColor(e.target.value);
    },
    [selectedShape],
  );

  const handleFillColorChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (selectedShape) {
        canvasState.updateShape(selectedShape.id, {
          fillColor: e.target.value,
        });
      }
      toolState.setFillColor(e.target.value);
    },
    [selectedShape],
  );

  const handleLineWidthChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (selectedShape) {
        canvasState.updateShape(selectedShape.id, { strokeWidth: Number(e.target.value) });
      }
      toolState.setLineWidth(Number(e.target.value));
    },
    [selectedShape],
  );

  const { strokeColor, fillColor, strokeWidth } = selectedShape || toolState;

  return (
    <aside className={cn('flex flex-col gap-3 rounded-lg bg-primary-50 p-3 shadow-sm', className)}>
      <div className="flex justify-between">
        <label htmlFor="stroke-color-input" className="inline-flex items-center">
          Stroke color
        </label>
        <ColorInput id="stroke-color-input" onChange={handleStrokeColorChange} value={strokeColor as string} />
      </div>
      <div className="flex justify-between">
        <label htmlFor="color-input" className="inline-flex items-center">
          Background color
        </label>
        <ColorInput id="background-color-input" onChange={handleFillColorChange} value={fillColor as string} />
      </div>
      <RangeInput
        id="line-width-input"
        min={1}
        max={50}
        label="Line width"
        onChange={handleLineWidthChange}
        value={strokeWidth as number}
      />

      {openImageToolbar && <ImageFiltersMenuToolbar />}
    </aside>
  );
});

export function AsideToolbar() {
  // const [isToolbarOpened, setIsToolbarOpened] = useState(false);
  return (
    <div className="absolute bottom-0 left-5 hidden h-[100vh] items-center md:flex">
      <Toolbar />
    </div>
    // <>

    //   <div className="absolute bottom-10 right-1/2 flex translate-x-1/2 flex-col gap-3 rounded-lg bg-primary-50 p-2 shadow-sm md:hidden">
    //     <SquareButton title="Paramters" onClick={() => setIsToolbarOpened(v => !v)}>
    //       <BsPalette />
    //     </SquareButton>
    //     {isToolbarOpened && (
    //       <div className="absolute bottom-20 right-1/2 translate-x-1/2">
    //         <Toolbar />
    //       </div>
    //     )}
    //   </div>
    // </>
  );
}
