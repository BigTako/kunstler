import React from 'react';
import { HeaderToolbar } from './_components/header';

export default function Home() {
  // flex min-h-screen flex-col items-center justify-between p-24
  return (
    <main className="relative h-full w-full">
      <HeaderToolbar />
    </main>
  );
}
