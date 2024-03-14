'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

interface GeneratePageProps extends React.PropsWithChildren {
  id?: string;
}
const GeneratePage: React.FC<GeneratePageProps> = () => {
  const [initialize, setInitialize] = React.useState(false);
  const handleButtonClick = () => {
    setInitialize(true);
  };
  return (
    <section>
      <div>
        <Button onClick={handleButtonClick}>Let's Start</Button>
        <AnimatePresence>
          {initialize && (
            <motion.div
              className='w-full h-fulletoouy bg-blue-500'
              animate={{
                scale: [1, 3, 2, 1, 2],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ['20%', '20%', '50%', '50%', '20%'],
                repeatCount: 0,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GeneratePage;
