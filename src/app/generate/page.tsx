'use client';

import React from 'react';

import FormWrapper from '@/components/multi-step-form/FormWrapper';

interface GeneratePageProps extends React.PropsWithChildren {
  id?: string;
}
const GeneratePage: React.FC<GeneratePageProps> = () => {
  return (
    <section className='w-full'>
      <FormWrapper />
    </section>
  );
};

export default GeneratePage;
