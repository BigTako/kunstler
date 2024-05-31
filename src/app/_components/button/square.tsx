import React, { ReactNode } from 'react';

export function SquareButton({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <button
      className="flex h-[36px] w-[36px] items-center justify-center rounded-lg transition-colors hover:bg-secondary-100 active:bg-secondary-200"
      title={title}
    >
      <div className="max-h-full max-w-full text-primary-900">{children}</div>
    </button>
  );
}
