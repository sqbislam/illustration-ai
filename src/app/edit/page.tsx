import React from 'react';

import ImageEditor from '@/components/edit-image-components/ImageEditor';

interface EditImageProps extends React.PropsWithChildren {
  id?: string;
}

const EditImagePage: React.FC<EditImageProps> = (props) => {
  return (
    <section className='w-full'>
      <ImageEditor />
    </section>
  );
};

export default EditImagePage;
