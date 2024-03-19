'use client';

import React from 'react';

import GenerateForm from '@/components/generate-page-components/GenerateForm';
import ImagePreview from '@/components/generate-page-components/ImagePreview';
import { useGenerate } from '@/components/generate-page-components/useGenerate';

interface GeneratePageProps extends React.PropsWithChildren {
  id?: string;
}
const GeneratePage: React.FC<GeneratePageProps> = () => {
  const generateProps = useGenerate({});
  const { isLoading, response } = generateProps;
  return (
    <section className='w-full flex items-center justify-center sm:flex-row lg: flex-col'>
      <GenerateForm generateProps={generateProps} />
      <ImagePreview
        isLoading={isLoading}
        imageUrl={response && response.image_url}
      />
    </section>
  );
};

export default GeneratePage;
