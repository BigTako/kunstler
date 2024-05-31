import React from 'react';

function ColorInput({ id }: { id: string }) {
  return (
    <input
      type="color"
      id={id}
      className="box-border h-[30px] w-[30px] cursor-pointer rounded-md border-none outline outline-1 outline-offset-2 outline-primary-900"
    />
  );
}

export function AsideToolbar() {
  return (
    <aside className="absolute bottom-1/2 left-5 flex flex-col gap-3 rounded-lg bg-primary-50 p-3 shadow-sm">
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
