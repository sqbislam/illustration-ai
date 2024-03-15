import * as ImageTracer from 'imagetracerjs';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import { Button } from '../ui/button';

export default function ImagePreview() {
  const [svg, setSvg] = useState('');
  const handleClick = useCallback(async () => {
    console.debug('clicked');

    await ImageTracer.imageToSVG(
      '/assets/ex (2).png',
      (svg: string) => {
        setSvg(svg);
      },
      'sharp',
    );
  }, []);
  return (
    <div className='w-full flex-shrink-0 flex-col mx-5 lg: basis-[30%] h-120 bg-gray-200 flex items-center justify-center'>
      <Button onClick={handleClick}>Generate</Button>
      <Image
        id='sourceImage'
        src='/assets/ex (2).png'
        alt='preview image'
        height={200}
        width={200}
      />

      <div
        id='svgcontainer'
        className='w-[200px] h-[200px]'
        dangerouslySetInnerHTML={{ __html: svg }}
      ></div>
    </div>
  );
}
