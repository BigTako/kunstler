'use client';

import { cn } from '@/utils/cn';
import React, { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';
import { BsPalette } from 'react-icons/bs';
import { SquareButton } from '@components';
import { observer } from 'mobx-react-lite';
import { toolState } from '@store';

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

const Toolbar = observer(function ({ className }: { className?: string }) {
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
