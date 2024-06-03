'use client';

import React, { useState } from 'react';

import { BsBrush, BsPaintBucket, BsApp, BsCircle, BsEraser, BsImage, BsDashLg } from 'react-icons/bs';
import { HiArrowUturnLeft, HiArrowUturnRight } from 'react-icons/hi2';
import { SquareButton } from '@components';
import { cn } from '@/utils/cn';

const headerToolbarButtons = [
  {
    title: 'Brush',
    icon: <BsBrush />,
    selectable: true,
  },
  {
    title: 'Fill',
    icon: <BsPaintBucket />,
    selectable: true,
  },
  {
    title: 'Rect shape',
    icon: <BsApp />,
    selectable: true,
  },
  {
    title: 'Circle shape',
    icon: <BsCircle />,
    selectable: true,
  },
  {
    title: 'Eraser',
    icon: <BsEraser />,
    selectable: true,
  },
  {
    title: 'Line',
    icon: <BsDashLg />,
    selectable: true,
  },
  {
    title: 'Add image',
    icon: <BsImage />,
    selectable: false,
  },
  {
    title: 'Undo',
    icon: <HiArrowUturnLeft />,
    selectable: false,
  },
  {
    title: 'Redo',
    icon: <HiArrowUturnRight />,
    selectable: false,
  },
];

export function HeaderToolbar() {
  const [selectedOption, setSelectedOption] = useState('Brush');
  return (
    <header className="absolute right-1/2 top-6 flex translate-x-1/2 gap-3 rounded-lg bg-primary-50 p-1 shadow-sm">
      {headerToolbarButtons.map(({ title, icon, selectable }) => (
        <SquareButton
          key={title}
          title={title}
          className={cn('md:h-[40px] md:w-[40px]', selectable && selectedOption === title ? 'bg-secondary-200' : '')}
          onClick={() => {
            setSelectedOption(title);
          }}
        >
          {icon}
        </SquareButton>
      ))}
    </header>
  );
}
