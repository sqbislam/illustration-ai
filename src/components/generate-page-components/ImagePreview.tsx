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
      const scaleFactor = getScaleFactor();
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
    <div className='w-full flex-shrink-0 flex-col mx-5 lg: basis-[30%] h-120 flex items-center justify-center'>
      <Image
        id='sourceImage'
        src={imageUrl || 'http://picsum.photos/200'}
        alt='preview image'
        height={200}
        width={200}
      />
      {isLoading ? (
        <Skeleton className='w-[200px] h-[200px] mt-5' />
      ) : (
        <div
          id='svgcontainer'
          className='w-[200px] h-[200px] mt-5'
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
