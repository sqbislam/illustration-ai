import { type ClassValue, clsx } from 'clsx';
import { customAlphabet } from 'nanoid';
import { RGBColor } from 'react-color';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7,
);

// Helper func to add a delay
export function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

// Function to parse integer values from a string input
export function parseInteger(input: string) {
  // Check if the input is a number or has a number substring

  if (!/^\d+$/.test(input) && !/\d/.test(input)) {
    return 0;
  }
  return parseInt(input, 10);
}

export function parseHexToRGBArray(rgb: string): RGBColor {
  // Parse Hex string to RGB array witj alpha
  const hex = rgb.replace('#', '');
  let a = 1;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  if (hex.length === 8) {
    a = parseInt(hex.substring(6, 8), 16) / 255;
  }
  return { r, g, b, a };
}
