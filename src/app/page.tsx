import React from 'react';
import { AsideToolbar, HeaderToolbar } from '@components';

import dynamic from 'next/dynamic';
const Canvas = dynamic(() => import('./_components/Canvas'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative h-full w-full">
      <Canvas />
      <HeaderToolbar />
      <AsideToolbar />
    </main>
  );
}
