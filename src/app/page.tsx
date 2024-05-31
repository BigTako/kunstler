import React from 'react';
import { HeaderToolbar } from './_components/HeaderToolbar';
import { AsideToolbar } from './_components/AsideToolbar';

export default function Home() {
  return (
    <main className="relative h-full w-full">
      <HeaderToolbar />
      <AsideToolbar />
    </main>
  );
}
