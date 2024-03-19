import { RGBColor } from 'react-color';

export const optionpresets = Object.freeze({
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

  posterized1: {
    corsenabled: true,
    colorsampling: 0,
    numberofcolors: 2,
    ltres: 1,
    qtres: 1,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
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

  posterized2: {
    corsenabled: true,
    numberofcolors: 4,
    blurradius: 5,
    colorsampling: 0,
    ltres: 1,
    qtres: 1,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
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
    blurdelta: 20,
  },

  curvy: {
    corsenabled: true,
    ltres: 0.01,
    linefilter: true,
    rightangleenhance: false,
    numberofcolors: 4,
    blurradius: 5,
    colorsampling: 0,

    qtres: 1,
    pathomit: 8,

    // Color quantization
    mincolorratio: 0,
    colorquantcycles: 3,

    // Layering method
    layering: 0,

    // SVG rendering
    strokewidth: 1,
    scale: 1,
    roundcoords: 1,
    viewbox: false,
    desc: false,
    lcpr: 0,
    qcpr: 0,

    // Blur
    blurdelta: 20,
  },

  sharp: {
    corsenabled: true,
    qtres: 0.01,
    linefilter: false,
    numberofcolors: 4,
    blurradius: 5,
    colorsampling: 0,
    ltres: 1,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
    mincolorratio: 0,
    colorquantcycles: 3,

    // Layering method
    layering: 0,

    // SVG rendering
    strokewidth: 1,
    scale: 1,
    roundcoords: 1,
    viewbox: false,
    desc: false,
    lcpr: 0,
    qcpr: 0,

    // Blur
    blurdelta: 20,
  },

  detailed: {
    corsenabled: true,
    pathomit: 0,
    roundcoords: 2,
    ltres: 0.5,
    qtres: 0.5,
    numberofcolors: 64,

    blurradius: 5,
    colorsampling: 0,

    rightangleenhance: true,

    // Color quantization
    mincolorratio: 0,
    colorquantcycles: 3,

    // Layering method
    layering: 0,

    // SVG rendering
    strokewidth: 1,
    linefilter: false,
    viewbox: false,
    desc: false,
    lcpr: 0,
    qcpr: 0,

    // Blur
    blurdelta: 20,
  },

  smoothed: {
    corsenabled: true,
    blurradius: 5,
    blurdelta: 64,
    numberofcolors: 4,
    colorsampling: 0,
    ltres: 1,
    qtres: 1,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
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
  },

  grayscale: {
    corsenabled: true,
    colorsampling: 0,
    colorquantcycles: 1,
    numberofcolors: 7,
    blurradius: 5,
    ltres: 1,
    qtres: 1,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
    mincolorratio: 0,

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
    blurdelta: 20,
  },

  fixedpalette: {
    corsenabled: true,
    colorsampling: 0,
    colorquantcycles: 1,
    numberofcolors: 27,
    blurradius: 5,
    ltres: 1,
    qtres: 1,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
    mincolorratio: 0,

    // Layering method
    layering: 0,

    // SVG rendering
    strokewidth: 1,
    linefilter: false,
    scale: 1,
    roundcoords: 1,
    viewbox: true,
    desc: false,
    lcpr: 0,
    qcpr: 0,

    // Blur
    blurdelta: 20,
  },

  randomsampling1: {
    corsenabled: true,
    colorsampling: 1,
    numberofcolors: 8,
    blurradius: 5,
    ltres: 1,
    qtres: 1,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
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
    blurdelta: 20,
  },

  randomsampling2: {
    corsenabled: true,
    colorsampling: 1,
    numberofcolors: 64,
    blurradius: 5,
    ltres: 1,
    qtres: 1,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
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
    blurdelta: 20,
  },

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
    rightangleenhance: true,

    // Color quantization
    mincolorratio: 0,

    // Layering method
    layering: 0,

    // SVG rendering
    scale: 1,
    roundcoords: 1,
    viewbox: false,
    desc: false,
    lcpr: 0,
    qcpr: 0,
  },

  artistic2: {
    corsenabled: true,
    qtres: 0.01,
    colorsampling: 0,
    colorquantcycles: 1,
    numberofcolors: 4,
    strokewidth: 0,
    blurradius: 5,
    ltres: 1,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
    mincolorratio: 0,
    // Layering method
    layering: 0,

    // SVG rendering
    linefilter: false,
    scale: 1,
    roundcoords: 1,
    viewbox: false,
    desc: false,
    lcpr: 0,
    qcpr: 0,

    // Blur
    blurdelta: 20,
  },

  artistic3: {
    corsenabled: true,
    qtres: 10,
    ltres: 10,
    numberofcolors: 8,
    blurradius: 5,
    colorsampling: 0,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
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
    blurdelta: 20,
  },

  artistic4: {
    corsenabled: true,
    qtres: 10,
    ltres: 10,
    numberofcolors: 64,
    blurradius: 5,
    blurdelta: 256,
    strokewidth: 2,
    colorsampling: 0,
    pathomit: 8,
    rightangleenhance: true,

    // Color quantization
    mincolorratio: 0,
    colorquantcycles: 3,

    // Layering method
    layering: 0,

    // SVG rendering
    linefilter: false,
    scale: 1,
    roundcoords: 1,
    viewbox: false,
    desc: false,
    lcpr: 0,
    qcpr: 0,

    // Blur
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

    // Layering method
    layering: 0,

    // SVG rendering
    viewbox: false,
    desc: false,
    lcpr: 0,
    qcpr: 0,
  },
}); // End of optionpresets

// Create type of optionpresets object and make all keys optional
export interface OptionPresets {
  corsenabled?: boolean;
  ltres?: number;
  qtres?: number;
  pathomit?: number;
  rightangleenhance?: boolean;
  colorsampling?: number;
  numberofcolors?: number;
  mincolorratio?: number;
  colorquantcycles?: number;
  layering?: number;
  strokewidth?: number;
  linefilter?: boolean;
  scale?: number;
  roundcoords?: number;
  viewbox?: boolean;
  desc?: boolean;
  lcpr?: number;
  qcpr?: number;
  blurradius?: number;
  blurdelta?: number;
  pal?: RGBColor[];
}
