'use client';

import * as ImageTracer from 'imagetracerjs';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

import { optionpresets, useOptions } from './useOptions';
import { PromptSuggestion } from '../PromptSuggestion';
import { FieldGroup } from '../ui/field-group';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';
import { Slider } from '../ui/slider';

export default function ImageEditor() {
  // const EditorOptions = {
  //   NumberOfColors:3,
  //   Filter Speckle (Cleaner)
  //   Segment Length (More coarse)
  //   Splice Threshold (More accurate)
  //   Corner Threshold (Smoother)
  //   Gradient Step (Less layers)
  //   Curve Fitting (Pixel| Polygon | Spline)
  //   Clustering
  // }
  const exampleimage = '/assets/ex (3).png';
  const { updateOptions, selectPreset, options, getScaleFactor } = useOptions({
    sourceImage: exampleimage,
  });
  const [svg, setSvg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updatePreview = useCallback(
    async (options?: any) => {
      setIsLoading(true);
      const scaleFactor = getScaleFactor();

      await ImageTracer.imageToSVG(
        exampleimage,
        async (svg: string) => {
          setSvg(svg);
          setIsLoading(false);
        },
        { ...options, scale: scaleFactor } ?? {
          ...optionpresets.default,
          scale: scaleFactor,
        },
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options],
  );
  useEffect(() => {
    updatePreview(options);
  }, [options, updatePreview]);

  return (
    <div className='w-full flex flex-row '>
      {/* Options */}
      <div className='w-full pr-5'>
        <FieldGroup>
          <Label>{`Number of Colors ${options.numberofcolors}`}</Label>
          <Slider
            id='numberofcolors'
            name='numberofcolors'
            defaultValue={[options.numberofcolors]}
            max={24}
            step={2}
            min={2}
            onValueCommit={(val) => {
              updateOptions('numberofcolors', val[0]);
            }}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>{`Color Sampling ${options.colorsampling}`}</Label>
          <Slider
            id='colorsampling'
            name='colorsampling'
            defaultValue={[options.colorsampling]}
            max={6}
            step={1}
            min={0}
            onValueCommit={(val) => {
              updateOptions('colorsampling', val[0]);
            }}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>{`Stroke Width ${options.strokewidth}`}</Label>
          <Slider
            id='strokewidth'
            name='strokewidth'
            defaultValue={[options.strokewidth]}
            max={5}
            step={1}
            min={0}
            onValueCommit={(val) => {
              updateOptions('strokewidth', val[0]);
            }}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>{`Blur Radius ${options.blurradius}`}</Label>
          <Slider
            id='blurradius'
            name='blurradius'
            defaultValue={[options.blurradius]}
            max={10}
            step={1}
            min={0}
            onValueCommit={(val) => {
              updateOptions('blurradius', val[0]);
            }}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>Presets</Label>
          <div>
            {Object.keys(optionpresets).map((key) => (
              <PromptSuggestion
                suggestion={key}
                key={key}
                onClick={() => selectPreset(key)}
              />
            ))}
          </div>
        </FieldGroup>
      </div>
      <div className='w-full bg-red-200 flex flex-col items-center justify-center gap-5'>
        {/* Images */}
        <div>
          Source Image
          <Image
            id='sourceImage'
            src={exampleimage}
            alt='preview image'
            height={200}
            width={200}
          />
        </div>
        <div>
          Preview Image
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
      </div>
    </div>
  );
}
