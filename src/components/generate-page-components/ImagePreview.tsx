import * as ImageTracer from 'imagetracerjs';
import { DownloadIcon, Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { useOptions } from '../edit-image-components/useOptions';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

export default function ImagePreview({
  isLoading,
  imageUrl,
  svgOut,
  showEdit = true,
}: {
  isLoading: boolean;
  imageUrl: string | null;
  svgOut?: string | null;
  showEdit: boolean;
}) {
  const { options, getScaleFactor } = useOptions({
    sourceImage: imageUrl ?? '',
  });

  const [svg, setSvg] = useState(svgOut ?? '');

  const handleClick = useCallback(async () => {
    if (imageUrl) {
      const scaleFactor = await getScaleFactor();
      await ImageTracer.imageToSVG(
        imageUrl,
        async (svg: string) => {
          setSvg(svg);
        },
        { ...options, scale: scaleFactor },
      );
    }
  }, [getScaleFactor, imageUrl, options]);
  const downloadSVG = () => {
    const svg =
      (document &&
        document?.getElementById('svgcontainer') &&
        document?.getElementById('svgcontainer')?.innerHTML) ??
      '';
    const blob = new Blob([svg.toString()]);
    const element = document.createElement('a');
    element.download = 'illustration-ai.svg';
    element.href = window.URL.createObjectURL(blob);
    element.click();
    element.remove();
  };
  useEffect(() => {
    if (svgOut == '' || svgOut == undefined) {
      handleClick();
    }
  }, [handleClick, imageUrl, svgOut]);
  return (
    <div className='w-full basis-[50%] flex-grow flex-shrink-0 flex-col lg: basis-[30%] flex items-center justify-center'>
      {isLoading ? (
        <Skeleton className='w-[400px] h-[400px] mt-5' />
      ) : (
        <Image
          id='sourceImage'
          src={imageUrl || 'https://placehold.co/600x600/000000/FFF'}
          alt='preview image'
          height={400}
          width={400}
        />
      )}
      {isLoading ? (
        <Skeleton className='w-[400px] h-[400px] mt-5' />
      ) : (
        <div
          id='svgcontainer'
          className='w-[400px] h-[400px] mt-5'
          dangerouslySetInnerHTML={{ __html: svgOut ?? svg }}
        ></div>
      )}
      <div className='flex flex-row gap-2 mt-2'>
        {showEdit && (
          <Button
            variant='link'
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Link href='/edit'>
              <Edit />
            </Link>
          </Button>
        )}

        <Button
          variant='link'
          onClick={(e) => {
            e.preventDefault();
            downloadSVG();
          }}
        >
          <DownloadIcon />
        </Button>
      </div>
    </div>
  );
}
