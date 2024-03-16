import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Edit Image',
  description: '',
};

export default function EditImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
