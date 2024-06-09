'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { BsBrush, BsApp, BsCircle, BsImage, BsDashLg, BsDownload, BsThreeDotsVertical } from 'react-icons/bs';
import { HiArrowUturnLeft, HiArrowUturnRight } from 'react-icons/hi2';
import { PiHand } from 'react-icons/pi';
import { SquareButton } from '@components';
import { cn } from '@/utils/cn';
import { canvasState, toolState } from '@store';
import { Brush, Ellipse as EllipseTool, Line as LineTool, Palm, Rect as RectTool, ImageTool } from '@tools';
import Konva from 'konva';
import { observer } from 'mobx-react-lite';

function downloadURI({ uri, name }: { uri: string; name: string }) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // delete link;
}

const headerToolbarButtons = [
  {
    title: 'Palm',
    icon: <PiHand />,
    selectable: true,
    onClick: () => {
      toolState.setTool(new Palm());
    },
    visible: true,
  },
  {
    title: 'Brush',
    icon: <BsBrush />,
    selectable: true,
    onClick: () => toolState.setTool(new Brush()),
    visible: true,
  },
  {
    title: 'Rect shape',
    icon: <BsApp />,
    selectable: true,
    onClick: () => toolState.setTool(new RectTool()),
    visible: true,
  },
  {
    title: 'Ellipse shape',
    icon: <BsCircle />,
    selectable: true,
    onClick: () => toolState.setTool(new EllipseTool()),
    visible: true,
  },
  {
    title: 'Line',
    icon: <BsDashLg />,
    selectable: true,
    onClick: () => toolState.setTool(new LineTool()),
    visible: true,
  },
  {
    title: 'Add image',
    icon: <BsImage />,
    selectable: false,
    onClick: () => document.getElementById('image-input')?.click(),
    visible: true,
  },
  {
    title: 'Undo',
    icon: <HiArrowUturnLeft />,
    selectable: false,
    onClick: () => {
      canvasState.undo();
    },
    visible: true,
  },
  {
    title: 'Redo',
    icon: <HiArrowUturnRight />,
    selectable: false,
    onClick: () => {
      canvasState.redo();
    },
    visible: true,
  },
];

function ElementMenu({ onDelete, onDuplicate }: { onDelete: () => void; onDuplicate: () => void }) {
  return (
    <div className="flex flex-col justify-start rounded-lg bg-primary-50 p-1 shadow-sm">
      <button
        className="flex items-center gap-2 rounded-lg p-2 text-start text-primary-900 transition-colors hover:bg-secondary-100 active:bg-secondary-200"
        onClick={onDuplicate}
      >
        Duplicate element
      </button>
      <button
        className="rounded-lg p-2 text-start text-red-700 transition-colors hover:bg-red-100 active:bg-red-200"
        onClick={onDelete}
      >
        Delete element
      </button>
    </div>
  );
}

function SaveMenu() {
  const [fileName, setFileName] = useState('image');

  const handleDownload = useCallback(() => {
    canvasState.selectShape(-1);
    const stageRef = canvasState.getStageRef() as React.MutableRefObject<Konva.Stage>;
    if (!stageRef) return;

    const stage = stageRef.current as Konva.Stage;
    if (!stage) return;

    const uri = stage.toDataURL({ pixelRatio: 3 });
    const imageFileName = `${fileName}.png`;
    downloadURI({ uri, name: imageFileName });
  }, [fileName]);

  return (
    <div className="flex flex-col justify-start rounded-lg bg-primary-50 p-2 shadow-sm">
      <div className="flex flex-col gap-2">
        <div>{`Save as ${fileName}.png`}</div>

        <input
          type="text"
          min={1}
          max={50}
          className="w-full rounded-lg border-[2px] border-primary-200 p-2"
          placeholder="Enter file name"
          value={fileName}
          onChange={e => setFileName(e.target.value)}
        />
        <button
          onClick={() => handleDownload()}
          className="flex items-center justify-center gap-2 rounded-lg bg-secondary-100 p-2 text-center text-primary-900 transition-colors hover:bg-secondary-200 active:bg-secondary-300"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export const HeaderToolbar = observer(function () {
  const [selectedOption, setSelectedOption] = useState('Brush');

  const [menuOpened, setMenuOpened] = useState('');

  useEffect(() => {
    headerToolbarButtons.find(b => b.title === 'Brush')?.onClick();
  }, []);

  const isElementMenuButtonVisisbe = canvasState.selectedShapeId !== -1;

  useEffect(() => {
    if (!isElementMenuButtonVisisbe) {
      if (menuOpened === 'Details') {
        setMenuOpened('');
      }
    }
  }, [isElementMenuButtonVisisbe, menuOpened]);

  const handleMenuAction = useCallback(() => {
    setSelectedOption('Palm');
    headerToolbarButtons.find(b => b.title === 'Palm')?.onClick();
    setMenuOpened('');
  }, []);

  const handleDuplicateElement = useCallback(() => {
    canvasState.duplicateSelectedShape();
    handleMenuAction();
  }, [handleMenuAction]);

  const handleDeleteElement = useCallback(() => {
    canvasState.removeSelectedShape();
    handleMenuAction();
  }, [handleMenuAction]);

  const elementsMenuButtons = useMemo(
    () => [
      {
        title: 'Download',
        icon: <BsDownload />,
        selectable: true,
        onClick: function () {
          console.log(this);
          setSelectedOption('Download');
          setMenuOpened(v => (v === 'Download' ? '' : 'Download'));
        },
        visible: true,
      },
      {
        title: 'Details',
        icon: <BsThreeDotsVertical />,
        selectable: true,
        onClick: () => {
          setSelectedOption('Details');
          setMenuOpened(v => (v === 'Details' ? '' : 'Details'));
        },
        visible: isElementMenuButtonVisisbe,
      },
    ],
    [isElementMenuButtonVisisbe],
  );

  return (
    <header className="absolute right-1/2 top-6 flex translate-x-1/2 flex-col items-end gap-3">
      <input
        type="file"
        id="image-input"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const tool = new ImageTool();
          toolState.setTool(tool);
          tool.upload(e.target.files?.[0] as File);
        }}
      />
      <div className="flex gap-3 rounded-lg bg-primary-50 p-1 shadow-sm">
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
        {elementsMenuButtons.map(
          ({ title, icon, onClick, selectable, visible }) =>
            visible && (
              <SquareButton
                key={title}
                title={title}
                className={cn(
                  'md:h-[40px] md:w-[40px]',
                  selectable && selectedOption === title ? 'bg-secondary-200' : '',
                )}
                onClick={() => {
                  onClick?.();
                  setSelectedOption(title);
                }}
              >
                {icon}
              </SquareButton>
            ),
        )}
      </div>
      {menuOpened === 'Details' && <ElementMenu onDelete={handleDeleteElement} onDuplicate={handleDuplicateElement} />}
      {menuOpened === 'Download' && <SaveMenu />}
    </header>
  );
});
