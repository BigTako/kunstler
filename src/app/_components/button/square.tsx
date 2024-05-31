import { cn } from '@/utils/cn';
import React, { ReactNode } from 'react';

export function SquareButton({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      className={cn(
        'flex h-[36px] w-[36px] items-center justify-center rounded-lg text-primary-900 transition-colors hover:bg-secondary-100 active:bg-secondary-200',
        className,
      )}
      title={title}
    >
      <div className="text-inherit max-h-full max-w-full">{children}</div>
    </button>
  );
}
