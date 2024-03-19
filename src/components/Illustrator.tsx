'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import * as z from 'zod';

import downloadImage from '@/lib/downloadImage';
import {
  IllustratorGenerateRequest,
  IllustratorGenerateResponse,
} from '@/lib/service';
import { cn } from '@/lib/utils';

import { IllustrationCard } from '@/components/IllustrationCard';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import LoadingDots from '@/components/ui/loadingdots';
import { Textarea } from '@/components/ui/textarea';

import { PromptSuggestion } from './PromptSuggestion';

export const promptSuggestions = [
  'A city view with clouds',
  'A beautiful glacier',
  'A forest overlooking a mountain',
  'A saharan desert',
];

const generateFormSchema = z.object({
  prompt: z.string().min(3).max(160),
  num_inference_steps: z.number().int().min(1).max(10),
  guidance_scale: z.number().min(0).max(0.9),
  negative_prompt: z.string().min(3).max(160),
  scheduler: z.string().min(3).max(160),
  num_outputs: z.number().int().min(1).max(5),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;
const defaultValues = {
  prompt: '',
  num_inference_steps: 4,
  guidance_scale: 0.5,
  negative_prompt: 'worst quality, low quality',
  scheduler: 'K_EULER',
  num_outputs: 1,
};
const Body = ({
  imageUrl,
  prompt,
  redirectUrl,
  modelLatency,
  id,
}: {
  imageUrl?: string;
  prompt?: string;
  redirectUrl?: string;
  modelLatency?: number;
  id?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<IllustratorGenerateResponse | null>(
    null,
  );

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: 'onChange',

    // Set default values so that the form inputs are controlled components.
    defaultValues: {
      prompt: '',
      num_inference_steps: 4,
      guidance_scale: 0.5,
      negative_prompt: 'worst quality, low quality',
      scheduler: 'K_EULER',
      num_outputs: 1,
    },
  });

  useEffect(() => {
    if (imageUrl && prompt && modelLatency && id) {
      setResponse({
        image_url: imageUrl,
        model_latency_ms: modelLatency,
        id: id,
      });

      form.setValue('prompt', prompt);
    }
  }, [imageUrl, modelLatency, prompt, redirectUrl, id, form]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      form.setValue('prompt', suggestion);
    },
    [form],
  );

  const handleSubmit = useCallback(async (values: GenerateFormValues) => {
    setIsLoading(true);
    setResponse(null);

    try {
      const request: IllustratorGenerateRequest = {
        ...defaultValues,
        prompt: values.prompt,
      };
      const response = await fetch('/api/illustrator', {
        method: 'POST',
        body: JSON.stringify(request),
      });

      // Handle API errors.
      if (!response.ok || response.status !== 200) {
        const text = await response.text();
        throw new Error(
          `Failed to generate Illustration code: ${response.status}, ${text}`,
        );
      }

      const data = await response.json();
      setResponse(data);
      // Vercel Analytics
      // va.track("Generated QR Code", {
      //   prompt: values.prompt,
      // });

      // router.push(`/start/${data.id}`);
    } catch (error) {
      // va.track("Failed to generate", {
      //   prompt: values.prompt,
      // });
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className='flex justify-center items-center flex-col w-full lg:p-0 p-4 sm:mb-28 mb-0'>
      <div className='max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-10'>
        <div className='col-span-1'>
          <h1 className='text-3xl font-bold mb-10'>Generate a QR Code</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className='flex flex-col gap-4'>
                <FormField
                  control={form.control}
                  name='prompt'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prompt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='A city view with clouds'
                          className='resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className=''>
                        This is what you want to illustrate
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='my-2'>
                  <p className='text-sm font-medium mb-3'>Prompt suggestions</p>
                  <div className='grid sm:grid-cols-2 grid-cols-1 gap-3 text-center text-gray-500 text-sm'>
                    {promptSuggestions.map((suggestion) => (
                      <PromptSuggestion
                        key={suggestion}
                        suggestion={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        isLoading={isLoading}
                      />
                    ))}
                  </div>
                </div>
                <Button
                  type='submit'
                  disabled={isLoading}
                  className='inline-flex justify-center
                 max-w-[200px] mx-auto w-full'
                >
                  {isLoading ? (
                    <LoadingDots color='black' />
                  ) : response ? (
                    '✨ Regenerate'
                  ) : (
                    'Generate'
                  )}
                </Button>

                {error && (
                  <Alert variant='destructive'>
                    <AlertCircle className='h-4 w-4' />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </Form>
        </div>
        <div className='col-span-1'>
          <div>
            <div className='flex flex-col justify-center relative h-auto items-center'>
              {response ? (
                <IllustrationCard
                  imageURL={response.image_url}
                  time={(response.model_latency_ms / 1000).toFixed(2)}
                />
              ) : (
                <div
                  className={cn(
                    'relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto bg-gray-400 aspect-square max-w-full',
                    isLoading ? 'animate-pulse' : '',
                  )}
                />
              )}
            </div>
            {response && (
              <div className='flex justify-center gap-5 mt-4'>
                <Button
                  onClick={() =>
                    downloadImage(response.image_url, 'illustration')
                  }
                >
                  Download
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Body;
