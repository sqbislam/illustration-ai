'use client';

import * as ImageTracer from 'imagetracerjs';
import { useCallback, useEffect, useState } from 'react';

import { optionpresets } from '@/lib/constants';

import { useAppStore } from '@/providers/app-provider';

import PaletteSelector from './PaletteSelector';
import { useOptions } from './useOptions';
import ImagePreview from '../generate-page-components/ImagePreview';
import { PromptSuggestion } from '../PromptSuggestion';
import { FieldGroup } from '../ui/field-group';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

export default function ImageEditor() {
  const imageUrl = useAppStore((state) => state.formData?.image_url);
  const { updateOptions, selectPreset, options, getScaleFactor } = useOptions({
    sourceImage: imageUrl ?? '',
  });
  const [svg, setSvg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updatePreview = useCallback(
    async (options?: object) => {
      setIsLoading(true);
      const scaleFactor = getScaleFactor();

      await ImageTracer.imageToSVG(
        imageUrl,
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
    <div className='w-full flex flex-col lg:flex-row'>
      {/* Options */}
      <div className='w-full pr-5'>
        <FieldGroup>
          <Label>{`Number of Colors ${options.numberofcolors}`}</Label>
          <Slider
            id='numberofcolors'
            name='numberofcolors'
            value={[options.numberofcolors ?? 0]}
            max={24}
            step={2}
            min={2}
            onValueChange={(val: number[]) => {
              updateOptions('numberofcolors', val[0]);
            }}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>{`Color Sampling ${options.colorsampling}`}</Label>
          <Slider
            id='colorsampling'
            name='colorsampling'
            value={[options.colorsampling ?? 0]}
            max={6}
            step={1}
            min={0}
            onValueChange={(val: number[]) => {
              updateOptions('colorsampling', val[0]);
            }}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>{`Stroke Width ${options.strokewidth}`}</Label>
          <Slider
            id='strokewidth'
            name='strokewidth'
            value={[options.strokewidth ?? 0]}
            max={5}
            step={1}
            min={0}
            onValueChange={(val: number[]) => {
              updateOptions('strokewidth', val[0]);
            }}
          />
        </FieldGroup>

        <FieldGroup>
          <Label>{`Blur Radius ${options.blurradius}`}</Label>
          <Slider
            id='blurradius'
            name='blurradius'
            value={[options.blurradius ?? 0]}
            max={10}
            step={1}
            min={0}
            onValueChange={(val: number[]) => {
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
        <PaletteSelector />
      </div>
      <div className='border-l border-gray-200' role='separator'></div>
      <ImagePreview
        showEdit={false}
        imageUrl={imageUrl ?? ''}
        isLoading={isLoading}
        svgOut={svg}
      />
    </div>
  );
}
