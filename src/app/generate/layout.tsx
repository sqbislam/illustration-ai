import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Generate Illustrations AI - SVG Illustrations Generator',
  description:
    'Generate your AI Illustration and convert to desirable SVG in seconds',
};

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <h1>Hello</h1>
    </>
  );
}
