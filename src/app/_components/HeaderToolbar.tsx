import React from 'react';

import { BsBrush, BsPaintBucket, BsApp, BsCircle, BsEraser, BsImage } from 'react-icons/bs';
import { HiArrowUturnLeft, HiArrowUturnRight } from 'react-icons/hi2';
import { SquareButton } from '@components';

const headerToolbarButtons = [
  {
    title: 'Brush',
    icon: <BsBrush />,
  },
  {
    title: 'Fill',
    icon: <BsPaintBucket />,
  },
  {
    title: 'Rect shape',
    icon: <BsApp />,
  },
  {
    title: 'Circle shape',
    icon: <BsCircle />,
  },
  {
    title: 'Eraser',
    icon: <BsEraser />,
  },
  {
    title: 'Add image',
    icon: <BsImage />,
  },
  {
    title: 'Undo',
    icon: <HiArrowUturnLeft />,
  },
  {
    title: 'Redo',
    icon: <HiArrowUturnRight />,
  },
];

export function HeaderToolbar() {
  return (
    <header className="absolute right-1/2 top-6 flex translate-x-1/2 gap-3 rounded-lg bg-primary-50 p-1 shadow-sm">
      {headerToolbarButtons.map(button => (
        <SquareButton key={button.title} title={button.title}>
          {button.icon}
        </SquareButton>
      ))}
    </header>
  );
}
