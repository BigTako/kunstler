import type { Metadata } from 'next';
import { Dosis } from 'next/font/google';
import './styles/globals.css';
import React from 'react';

const inter = Dosis({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kunstler',
  description: 'Graphical editor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-primary-50`}>{children}</body>
    </html>
  );
}
