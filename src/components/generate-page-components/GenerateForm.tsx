import { CircleGauge, Paintbrush, Palette } from 'lucide-react';
import React, { useCallback } from 'react';

import { IUseGenerateProps } from './useGenerate';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

export default function GenerateForm({
  generateProps,
}: {
  generateProps: IUseGenerateProps;
}) {
  const { handleSubmitButton, form, isLoading } = generateProps;
  const [activeStep, setActiveStep] = React.useState('item-1');
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleClick = (val: string) => {
    setActiveStep(val);
  };
  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setValue('prompt', suggestion);
    },
    [setValue],
  );
  return (
    <Accordion
      type='single'
      collapsible
      className='w-full flex-shrink-0 max-w-md'
      value={activeStep}
      disabled={isLoading}
    >
      <AccordionItem onClick={() => handleClick('item-1')} value='item-1'>
        <AccordionTrigger>Choose art style</AccordionTrigger>
        <AccordionContent>
          <div className='w-full h-[300px] flex flex-col p-4 gap-2 rounded-sm justify-between'>
            <ToggleGroup
              type='single'
              {...register('artType')}
              value={getValues('artType')}
              onValueChange={(val: string) => {
                setValue('artType', val, { shouldValidate: true });
              }}
              size='lg'
            >
              <ToggleGroupItem value='vibrant' aria-label='Toggle vibrant'>
                <Palette className='h-4 w-4' />
                <p className='ml-2 text-sm lg: text-lg'>Vibrant</p>
              </ToggleGroupItem>
              <ToggleGroupItem value='artistic' aria-label='Toggle artistic'>
                <Paintbrush className='h-4 w-4' />
                <p className='ml-2 text-sm lg: text-lg'>Artistic</p>
              </ToggleGroupItem>
              <ToggleGroupItem
                value='monochrome'
                aria-label='Toggle monochrome'
              >
                <CircleGauge className='h-4 w-4' />
                <p className='ml-2 text-sm lg: text-lg'>Monochrome</p>
              </ToggleGroupItem>
              {errors.artType && (
                <p className='text-md text-red-500'>
                  Please select an art type
                </p>
              )}
            </ToggleGroup>

            <div className='flex flex-col items-center justify-center gap-5 my-5'>
              <div className='w-full flex flex-row justify-between'>
                <h2>Complexity</h2>
                <p>{getValues('complexity')}</p>
              </div>

              <Slider
                max={1}
                step={0.2}
                min={0}
                defaultValue={[getValues('complexity')]}
                onValueCommit={(val: number[]) => {
                  setValue('complexity', val[0]);
                }}
              />
              {errors.complexity && (
                <p className='text-md text-red-500'>
                  {errors.complexity.message}
                </p>
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      {/* <AccordionItem onClick={() => handleClick('item-2')} value='item-2'>
        <AccordionTrigger>Choose Palette</AccordionTrigger>
        <AccordionContent>
          <div className='w-full h-[400px] flex flex-col p-4 gap-2 rounded-sm justify-between'>
            <PaletteSelector />
          </div>
        </AccordionContent>
      </AccordionItem> */}
      <AccordionItem onClick={() => handleClick('item-3')} value='item-3'>
        <AccordionTrigger>Generate Image and SVG!</AccordionTrigger>
        <AccordionContent>
          <Form {...form}>
            <div className='w-full min-h-[200px] flex flex-col p-4 gap-2 rounded-sm justify-between'>
              <div className='flex w-full flex-row justify-between '>
                <FormField
                  name='height'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...register('height', {
                            valueAsNumber: true,
                            validate: (value) => value > 0 && value <= 512,
                          })}
                          type='number'
                          placeholder='e.g 100'
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
                          {...register('width', {
                            valueAsNumber: true,
                            validate: (value) => value > 0 && value <= 512,
                          })}
                          type='number'
                          placeholder='e.g 100'
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
                        {...register('prompt', {
                          required: 'Required',
                        })}
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
                <Button
                  type='submit'
                  disabled={isLoading}
                  onClick={handleSubmit((d) => handleSubmitButton(d))}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
