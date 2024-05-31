import React from 'react';
import { Canvas, AsideToolbar, HeaderToolbar } from '@components';

export default function Home() {
  return (
    <main className="relative h-full w-full">
      <Canvas />
      <HeaderToolbar />
      <AsideToolbar />
    </main>
  );
}
