import { CircleGauge, Paintbrush, Palette } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

type FormValues = {
  artType: string;
  colors: string[];
  complexity?: number;
  height: number;
  width: number;
  prompt: string;
};

const defaultValues: FormValues = {
  artType: 'vibrant',
  colors: [],
  complexity: 0.2,
  height: 100,
  width: 100,
  prompt: '',
};

export default function FormWrapper() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({ defaultValues });
  const [activeStep, setActiveStep] = React.useState('item-1');

  const handleClick = (val: string) => {
    setActiveStep(val);
  };

  return (
    <Accordion type='single' collapsible className='w-full' value={activeStep}>
      <AccordionItem onClick={() => handleClick('item-1')} value='item-1'>
        <AccordionTrigger>Choose art style</AccordionTrigger>
        <AccordionContent>
          <form className='w-full h-[200px] flex flex-col p-4 gap-2 rounded-sm justify-between'>
            <ToggleGroup
              type='single'
              {...register('artType')}
              value={getValues('artType')}
              onValueChange={(val) => {
                setValue('artType', val, { shouldValidate: true });
              }}
              size='lg'
            >
              <ToggleGroupItem value='vibrant' aria-label='Toggle vibrant'>
                <Palette className='h-4 w-4' />
                <h2 className='ml-2'>Vibrant</h2>
              </ToggleGroupItem>
              <ToggleGroupItem value='artistic' aria-label='Toggle artistic'>
                <Paintbrush className='h-4 w-4' />
                <h2 className='ml-2'>Artistic</h2>
              </ToggleGroupItem>
              <ToggleGroupItem
                value='monochrome'
                aria-label='Toggle monochrome'
              >
                <CircleGauge className='h-4 w-4' />
                <h2 className='ml-2'>Monochrome</h2>
              </ToggleGroupItem>
            </ToggleGroup>

            <div className='flex flex-col items-center justify-center gap-5 my-5'>
              <div className='w-full flex flex-row justify-between'>
                <h2>Complexity</h2>
                <p>{getValues('complexity')}</p>
              </div>

              <Slider
                defaultValue={[getValues('complexity') as any]}
                max={1}
                step={0.2}
                min={0}
                onValueCommit={(val) => {
                  setValue('complexity', val[0], { shouldValidate: true });
                }}
              />
            </div>

            <div className='flex flex-row items-end justify-end'>
              <Button type='submit'>Next</Button>
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem onClick={() => handleClick('item-2')} value='item-2'>
        <AccordionTrigger>Choose Palette</AccordionTrigger>
        <AccordionContent>
          <form className='w-full h-[200px] flex flex-col p-4 gap-2 rounded-sm justify-between'>
            <h3>Color picker goes here</h3>
          </form>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem onClick={() => handleClick('item-3')} value='item-3'>
        <AccordionTrigger>How should it look?</AccordionTrigger>
        <AccordionContent>
          <form className='w-full h-[200px] flex flex-col p-4 gap-2 rounded-sm justify-between'>
            <Input {...register('height')} placeholder='e.g 100px' />
            {errors?.height && <p>{errors.height.message}</p>}
            <Input {...register('width')} placeholder='e.g 100px' />
            {errors?.width && <p>{errors.width.message}</p>}
            <Input
              {...register('prompt')}
              placeholder='e.g A cat on a bed of candies'
            />
            {errors?.prompt && <p>{errors.prompt.message}</p>}
            <div className='flex flex-row items-end justify-end '>
              <Button type='submit'>Submit</Button>
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
