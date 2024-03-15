'use client';

import React from 'react';

import FormWrapper from '@/components/generate-page-components/FormWrapper';
import ImagePreview from '@/components/generate-page-components/ImagePreview';

interface GeneratePageProps extends React.PropsWithChildren {
  id?: string;
}
const GeneratePage: React.FC<GeneratePageProps> = () => {
  return (
    <section className='w-full flex items-center justify-center sm:flex-row lg: flex-col'>
      <FormWrapper />
      <ImagePreview />
    </section>
  );
};

export default GeneratePage;
