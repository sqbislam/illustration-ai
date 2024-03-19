'use client';
import { useEffect, useState } from 'react';
export const optionpresets = {
  default: {
    // Tracing
    corsenabled: true,
    ltres: 1,
    qtres: 1,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
    colorsampling: 2,
    numberofcolors: 16,
    mincolorratio: 0,
    colorquantcycles: 3,

    // Layering method
    layering: 0,

    // SVG rendering
    strokewidth: 1,
    linefilter: false,
    scale: 1,
    roundcoords: 1,
    viewbox: false,
    desc: false,
    lcpr: 0,
    qcpr: 0,

    // Blur
    blurradius: 0,
    blurdelta: 20,
  },

  posterized1: { corsenabled: true, colorsampling: 0, numberofcolors: 2 },

  posterized2: { corsenabled: true, numberofcolors: 4, blurradius: 5 },

  curvy: {
    corsenabled: true,
    ltres: 0.01,
    linefilter: true,
    rightangleenhance: false,
  },

  sharp: { corsenabled: true, qtres: 0.01, linefilter: false },

  detailed: {
    corsenabled: true,
    pathomit: 0,
    roundcoords: 2,
    ltres: 0.5,
    qtres: 0.5,
    numberofcolors: 64,
  },

  smoothed: { corsenabled: true, blurradius: 5, blurdelta: 64 },

  grayscale: {
    corsenabled: true,
    colorsampling: 0,
    colorquantcycles: 1,
    numberofcolors: 7,
  },

  fixedpalette: {
    corsenabled: true,
    colorsampling: 0,
    colorquantcycles: 1,
    numberofcolors: 27,
  },

  randomsampling1: { corsenabled: true, colorsampling: 1, numberofcolors: 8 },

  randomsampling2: { corsenabled: true, colorsampling: 1, numberofcolors: 64 },

  artistic1: {
    corsenabled: true,
    colorsampling: 0,
    colorquantcycles: 1,
    pathomit: 0,
    blurradius: 5,
    blurdelta: 64,
    ltres: 0.01,
    linefilter: true,
    numberofcolors: 16,
    strokewidth: 2,
  },

  artistic2: {
    corsenabled: true,
    qtres: 0.01,
    colorsampling: 0,
    colorquantcycles: 1,
    numberofcolors: 4,
    strokewidth: 0,
  },

  artistic3: { corsenabled: true, qtres: 10, ltres: 10, numberofcolors: 8 },

  artistic4: {
    corsenabled: true,
    qtres: 10,
    ltres: 10,
    numberofcolors: 64,
    blurradius: 5,
    blurdelta: 256,
    strokewidth: 2,
  },

  posterized3: {
    corsenabled: true,
    ltres: 1,
    qtres: 1,
    pathomit: 20,
    rightangleenhance: true,
    colorsampling: 0,
    numberofcolors: 3,
    mincolorratio: 0,
    colorquantcycles: 3,
    blurradius: 3,
    blurdelta: 20,
    strokewidth: 0,
    linefilter: false,
    roundcoords: 1,
    pal: [
      { r: 0, g: 0, b: 100, a: 255 },
      { r: 255, g: 255, b: 255, a: 255 },
      { r: 255, g: 0, b: 255, a: 255 },
    ],
  },
}; // End of optionpresets

interface UseOptionsProps {
  sourceImage: string;
}
export const useOptions = ({ sourceImage }: UseOptionsProps) => {
  const [options, setOptions] = useState(optionpresets.default);
  const [scaleFactor, setScaleFactor] = useState<number>(0);

  useEffect(() => {
    // Update the scale factor based on the source image size
    const img = new Image();
    // Magic to prevent CORS issues
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      const scaleFactor = 200 / img.width;
      setScaleFactor(scaleFactor);
      setOptions((prev) => ({ ...prev, scale: scaleFactor }));
    };
    img.src = sourceImage + '?' + new Date().getTime();
  }, [sourceImage]);

  const selectPreset = (_preset: string) => {
    if (Object.prototype.hasOwnProperty.call(optionpresets, _preset)) {
      const newOptions = optionpresets[_preset as keyof typeof optionpresets];
      setOptions((options) => ({ ...options, ...(newOptions as object) }));
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

      setOptions((prev) => ({ ...prev, [_field]: _value }));
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
