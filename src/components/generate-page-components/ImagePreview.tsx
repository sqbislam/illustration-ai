import * as ImageTracer from 'imagetracerjs';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import { optionpresets, useOptions } from '../edit-image-components/useOptions';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

export default function ImagePreview({
  isLoading,
  imageUrl,
}: {
  isLoading: boolean;
  imageUrl: string | null;
}) {
  const { options, getScaleFactor } = useOptions({
    sourceImage: imageUrl ?? '',
  });

  const [svg, setSvg] = useState('');
  const handleClick = useCallback(async () => {
    if (imageUrl) {
      const scaleFactor = getScaleFactor();
      await ImageTracer.imageToSVG(
        imageUrl,
        async (svg: string) => {
          setSvg(svg);
        },
        { ...options, scale: scaleFactor } ?? {
          ...optionpresets.default,
          scale: scaleFactor,
        },
      );
    }
  }, [getScaleFactor, imageUrl, options]);
  return (
    <div className='w-full flex-shrink-0 flex-col mx-5 lg: basis-[30%] h-120 flex items-center justify-center'>
      <Image
        id='sourceImage'
        src={imageUrl || 'http://picsum.photos/200'}
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
      <Button onClick={handleClick}>Generate</Button>
    </div>
  );
}
