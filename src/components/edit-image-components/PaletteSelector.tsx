import { Minus, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

import { parseHexToRGBArray } from '@/lib/utils';

import { useAppStore } from '@/providers/app-provider';

import { Button } from '../ui/button';

const MAX_COLORS = 5;
export default function PaletteSelector() {
  const [colorsArray, setColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState('');
  const { setPreference } = useAppStore((state) => ({
    colors: state.preferences?.colors,
    setPreference: state.setPreferences,
  }));

  const handleColorChange = (
    color: ColorResult,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.preventDefault();
    setNewColor(color.hex);
  };

  const handleAddColor = () => {
    if (
      newColor &&
      colorsArray.length < MAX_COLORS &&
      !colorsArray.includes(newColor)
    ) {
      setColors([...colorsArray, newColor]);
      setNewColor(newColor);
    }
  };
  const handleRemoveColorLast = () => {
    if (colorsArray.length > 0) {
      setColors(colorsArray.slice(0, -1));
    }
  };

  const handleRemoveColor = (color: string) => {
    if (color && color != '') {
      setColors(colorsArray.filter((c) => c !== color));
    }
  };

  useEffect(() => {
    const rgbColors = colorsArray?.map((color) => {
      return parseHexToRGBArray(color);
    });
    if (rgbColors) {
      setPreference({ colors: rgbColors });
    }
  }, [colorsArray, setPreference]);
  return (
    <div>
      <div className='flex mb-4'>
        <ChromePicker color={newColor} onChangeComplete={handleColorChange} />
        <div className='flex flex-col gap-2'>
          <Button
            onClick={handleAddColor}
            disabled={colorsArray.length >= MAX_COLORS}
            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-2 rounded w-[50px]'
          >
            <PlusIcon />
          </Button>
          <Button
            onClick={handleRemoveColorLast}
            variant='ghost'
            className='ml-2 rounded w-[50px]'
          >
            <Minus />
          </Button>
          <div className='flex flex-wrap -mx-2 ml-2 flex-grow'>
            {colorsArray.map((color, index) => (
              <div key={index} className='w-[30px] p-1'>
                <div
                  className='h-[20px] w-[20px] rounded border-2 border-slate-200 '
                  style={{ backgroundColor: color }}
                  onClick={() => handleRemoveColor(color)}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
