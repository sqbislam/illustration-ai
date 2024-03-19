'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    if (theme == 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [setTheme, theme]);

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={toggleTheme}
      className='absolute top-5 right-5'
    >
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
