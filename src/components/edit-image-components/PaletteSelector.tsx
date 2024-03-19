import { useState } from 'react';

import { Button } from '../ui/button';

const presets = {
  random: [],
  grayscale: [],
};

export default function PaletteSelector() {
  const [colors, setColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState('');

  const handleColorChange = (event: any) => {
    event.preventDefault();
    setNewColor(event.target.value);
  };

  const handleAddColor = () => {
    if (newColor && colors.length < 6 && !colors.includes(newColor)) {
      setColors([...colors, newColor]);
      setNewColor(newColor);
    }
  };

  const handleRemoveColor = (color: string) => {
    if (color && color != '') {
      setColors(colors.filter((c) => c !== color));
    }
  };

  return (
    <div>
      <div className='flex items-center mb-4'>
        <input
          type='color'
          value={newColor}
          onChange={handleColorChange}
          className='mr-2'
        />
        <Button
          onClick={handleAddColor}
          className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
        >
          Add Color
        </Button>
      </div>
      <div className='flex flex-wrap -mx-2'>
        {colors.map((color, index) => (
          <div key={index} className='w-1/2 sm:w-1/4 md:w-1/6 p-2'>
            <div
              className='h-16 rounded'
              style={{ backgroundColor: color }}
              onClick={() => handleRemoveColor(color)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
