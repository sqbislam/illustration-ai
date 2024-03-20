'use client';

import React from 'react';

import GenerateForm from '@/components/generate-page-components/GenerateForm';
import ImagePreview from '@/components/generate-page-components/ImagePreview';
import { useGenerate } from '@/components/generate-page-components/useGenerate';

import { useAppStore } from '@/providers/app-provider';

interface GeneratePageProps extends React.PropsWithChildren {
  id?: string;
}
const GeneratePage: React.FC<GeneratePageProps> = () => {
  const generateProps = useGenerate({});
  const { isLoading, response } = generateProps;
  const { image_url } = useAppStore((state) => ({
    image_url: state?.formData?.image_url ?? '',
  }));

  return (
    <section className='w-full flex justify-center sm:flex-row lg: flex-col'>
      <GenerateForm generateProps={generateProps} />
      <ImagePreview
        isLoading={isLoading}
        showEdit={true}
        imageUrl={(response && response?.image_url) ?? image_url}
      />
    </section>
  );
};

export default GeneratePage;
