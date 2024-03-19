'use client';
import { useEffect, useState } from 'react';

import { OptionPresets, optionpresets } from '@/lib/constants';

import { useAppStore } from '@/providers/app-provider';

interface UseOptionsProps {
  sourceImage: string;
}
export const useOptions = ({ sourceImage }: UseOptionsProps) => {
  const [options, setOptions] = useState<OptionPresets>(optionpresets.default);
  const [scaleFactor, setScaleFactor] = useState<number>(0);
  const colors = useAppStore((state) => state.preferences?.colors);

  useEffect(() => {
    // Update the scale factor based on the source image size
    const img = new Image();
    // Magic to prevent CORS issues
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      const scaleFactor = 200 / img.width;
      setScaleFactor(scaleFactor);

      setOptions((prev) => ({
        ...prev,
        scale: scaleFactor,
        pal: colors && colors.length > 0 ? colors : undefined,
      }));
    };
    img.src = sourceImage + '?' + new Date().getTime();
  }, [sourceImage, colors]);

  const selectPreset = (_preset: string) => {
    if (Object.prototype.hasOwnProperty.call(optionpresets, _preset)) {
      const newOptions = optionpresets[_preset as keyof typeof optionpresets];
      setOptions({
        ...newOptions,
        pal: colors && colors.length > 0 ? colors : undefined,
      } as OptionPresets);
    }
  };

  const updateOptions = (
    _field: string,
    _value: number | boolean | string | undefined,
  ) => {
    // Check if field exists in options and update value of the options object
    if (!_value) {
      // No value
      _value = 0;
    }
    if (Object.prototype.hasOwnProperty.call(options, _field)) {
      if (_value && typeof _value !== 'number' && typeof _value !== 'boolean') {
        _value = parseInt(_value);
      }

      setOptions((prev) => ({
        ...prev,
        [_field]: _value,
        pal: colors && colors.length > 0 ? colors : undefined,
      }));
    }
  };

  const getScaleFactor = () => {
    if (scaleFactor === 0) {
      return 1;
    } else {
      return scaleFactor;
    }
  };
  return { updateOptions, selectPreset, options, getScaleFactor };
};
