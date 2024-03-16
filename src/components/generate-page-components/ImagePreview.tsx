import * as ImageTracer from 'imagetracerjs';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import { timeout } from '@/lib/utils';

import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

export default function ImagePreview() {
  const [svg, setSvg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = useCallback(async () => {
    setIsLoading(true);
    await ImageTracer.imageToSVG(
      '/assets/ex (2).png',
      async (svg: string) => {
        await timeout(3000);
        setSvg(svg);

        setIsLoading(false);
      },
      'posterized3',
    );
  }, []);
  return (
    <div className='w-full flex-shrink-0 flex-col mx-5 lg: basis-[30%] h-120 flex items-center justify-center'>
      <Button onClick={handleClick}>Generate</Button>
      <Image
        id='sourceImage'
        src='/assets/ex (2).png'
        alt='preview image'
        height={200}
        width={200}
      />

      {isLoading ? (
        <Skeleton className='w-[200px] h-[200px]' />
      ) : (
        <div
          id='svgcontainer'
          className='w-[200px] h-[200px]'
          dangerouslySetInnerHTML={{ __html: svg }}
        ></div>
      )}
    </div>
  );
}
