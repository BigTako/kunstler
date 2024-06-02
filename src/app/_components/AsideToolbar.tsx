'use client';

import { cn } from '@/utils/cn';
import React, { ChangeEvent, useState } from 'react';
import { BsPalette } from 'react-icons/bs';
import { SquareButton } from '@components';
import { toolState } from '@store';

function ColorInput({
  id,
  onChange,
  defaultValue,
  className,
}: {
  id: string;
  className?: string;
  defaultValue?: string;
  onChange?: (_e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="color"
      id={id}
      onChange={onChange}
      defaultValue={defaultValue}
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

function Toolbar({ className }: { className?: string }) {
  return (
    <aside className={cn('flex flex-col gap-3 rounded-lg bg-primary-50 p-3 shadow-sm', className)}>
      <div className="flex justify-between">
        <label htmlFor="color-input" className="inline-flex items-center">
          Stroke color
        </label>
        <ColorInput
          id="color-input"
          defaultValue={(toolState.tool?.strokeColor ?? '#000') as string}
          onChange={e => toolState.setStrokeColor(e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <label htmlFor="fill-color-input" className="inline-flex items-center">
          Fill color
        </label>
        <ColorInput
          id="fill-color-input"
          defaultValue={(toolState.tool?.fillColor ?? '#000') as string}
          onChange={e => toolState.setFillColor(e.target.value)}
        />
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
          defaultValue={toolState.tool?.lineWidth ?? 1}
          min="1"
          max="50"
          onChange={e => toolState.setLineWidth(Number(e.target.value))}
        />
      </div>
    </aside>
  );
}

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
