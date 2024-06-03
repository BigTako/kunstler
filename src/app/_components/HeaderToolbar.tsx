'use client';

import React, { useEffect, useState } from 'react';

import { BsBrush, BsPaintBucket, BsApp, BsCircle, BsEraser, BsImage, BsDashLg } from 'react-icons/bs';
import { HiArrowUturnLeft, HiArrowUturnRight } from 'react-icons/hi2';
import { Line } from 'react-konva';
import { SquareButton } from '@components';
import { cn } from '@/utils/cn';
import { toolState } from '@store';
import { Brush } from '@tools';

const headerToolbarButtons = [
  {
    title: 'Brush',
    icon: <BsBrush />,
    selectable: true,
    onClick: () =>
      toolState.setTool(
        new Brush((shape, id) => (
          <Line
            key={id}
            points={shape.points}
            stroke="#000"
            strokeWidth={5}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        )),
      ),
  },
  {
    title: 'Fill',
    icon: <BsPaintBucket />,
    selectable: true,
    onClick: () => {},
  },
  {
    title: 'Rect shape',
    icon: <BsApp />,
    selectable: true,
    onClick: () => {},
  },
  {
    title: 'Circle shape',
    icon: <BsCircle />,
    selectable: true,
    onClick: () => {},
  },
  {
    title: 'Eraser',
    icon: <BsEraser />,
    selectable: true,
    onClick: () => {},
  },
  {
    title: 'Line',
    icon: <BsDashLg />,
    selectable: true,
    onClick: () => {},
  },
  {
    title: 'Add image',
    icon: <BsImage />,
    selectable: false,
    onClick: () => {},
  },
  {
    title: 'Undo',
    icon: <HiArrowUturnLeft />,
    selectable: false,
    onClick: () => {},
  },
  {
    title: 'Redo',
    icon: <HiArrowUturnRight />,
    selectable: false,
    onClick: () => {},
  },
];

export function HeaderToolbar() {
  const [selectedOption, setSelectedOption] = useState('Brush');

  useEffect(() => {
    headerToolbarButtons.find(b => b.title === 'Brush')?.onClick();
  }, []);

  return (
    <header className="absolute right-1/2 top-6 flex translate-x-1/2 gap-3 rounded-lg bg-primary-50 p-1 shadow-sm">
      {headerToolbarButtons.map(({ title, icon, onClick, selectable }) => (
        <SquareButton
          key={title}
          title={title}
          className={cn('md:h-[40px] md:w-[40px]', selectable && selectedOption === title ? 'bg-secondary-200' : '')}
          onClick={() => {
            onClick?.();
            setSelectedOption(title);
          }}
        >
          {icon}
        </SquareButton>
      ))}
    </header>
  );
}
