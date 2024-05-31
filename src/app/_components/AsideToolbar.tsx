'use client';

import { cn } from '@/utils/cn';
import React, { useState } from 'react';
import { BsPalette } from 'react-icons/bs';
import { SquareButton } from '@components';

function ColorInput({ id, className }: { id: string; className?: string }) {
  return (
    <input
      type="color"
      id={id}
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
  // flex-col gap-3 rounded-lg bg-primary-50 p-3 shadow-sm
  return (
    <aside className={cn('flex flex-col gap-3 rounded-lg bg-primary-50 p-3 shadow-sm', className)}>
      <div className="flex justify-between">
        <label htmlFor="color-input" className="inline-flex items-center">
          Stroke color
        </label>
        <ColorInput id="color-input" />
      </div>
      <div className="flex justify-between">
        <label htmlFor="color-input" className="inline-flex items-center">
          Background color
        </label>
        <ColorInput id="background-color-input" />
      </div>
      <div className="flex flex-col justify-between">
        <label htmlFor="color-input" className="inline-flex items-center">
          Line width
        </label>
        <input type="range" id="lint-width-input" name="lint-width-input" className="cursor-pointer" min="1" max="50" />
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
      <div className="absolute bottom-10 right-1/2 flex translate-x-1/2 flex-col gap-3 rounded-lg bg-primary-50 p-3 shadow-sm md:hidden">
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
