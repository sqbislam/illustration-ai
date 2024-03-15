import { CircleGauge, Paintbrush, Palette } from 'lucide-react';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { promptSuggestions } from '../Illustrator';
import { PromptSuggestion } from '../PromptSuggestion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
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
  const form = useForm<FormValues>({ defaultValues });
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = form;
  const [activeStep, setActiveStep] = React.useState('item-1');

  const handleClick = (val: string) => {
    setActiveStep(val);
  };
  const handleSuggestionClick = useCallback((suggestion: string) => {
    setValue('prompt', suggestion);
  }, []);

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
          <Form {...form}>
            <form className='w-full min-h-[200px] flex flex-col p-4 gap-2 rounded-sm justify-between'>
              <div className='flex w-full flex-row justify-between '>
                <FormField
                  name='height'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input
                          {...register('height')}
                          {...field}
                          placeholder='e.g 100px'
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='width'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...register('width')}
                          placeholder='e.g 100px'
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        {...register('prompt')}
                        placeholder='e.g A cat on a bed of candies'
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <h2>Suggestions</h2>
              {promptSuggestions.map((suggestion) => (
                <PromptSuggestion
                  key={suggestion}
                  suggestion={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                />
              ))}
              <div className='flex flex-row items-end justify-end '>
                <Button type='submit' onClick={(e) => e.preventDefault()}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
