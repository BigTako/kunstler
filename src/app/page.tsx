import React from 'react';
import { HeaderToolbar } from './_components/HeaderToolbar';
import { AsideToolbar } from './_components/AsideToolbar';
import { Canvas } from './_components/Canvas';

export default function Home() {
  return (
    <main className="relative h-full w-full">
      <Canvas />
      <HeaderToolbar />
      <AsideToolbar />
    </main>
  );
}
