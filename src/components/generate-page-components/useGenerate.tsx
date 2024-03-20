import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import {
  IllustratorGenerateRequest,
  IllustratorGenerateResponse,
} from '@/lib/service';
import { nanoid } from '@/lib/utils';

import { useAppStore } from '@/providers/app-provider';

const generateFormSchema = z.object({
  prompt: z.string().min(3).max(160),
  num_inference_steps: z.number().int().min(1).max(10),
  guidance_scale: z.number().min(0).max(0.9),
  negative_prompt: z.string().min(3).max(450),
  scheduler: z.string().min(3).max(160),
  num_outputs: z.number().int().min(1).max(5),
  complexity: z.number().min(0.1).max(1),
  artType: z.string().min(3).max(160),
  height: z.number().int().min(1).max(512),
  width: z.number().int().min(1).max(512),
});

export interface IUseGenerateProps {
  handleSubmitButton: (values: GenerateFormValues) => Promise<void>;
  handleSuggestionClick: (suggestion: string) => void;
  response: IllustratorGenerateResponse | null;
  error: Error | null;
  isLoading: boolean;
  form: UseFormReturn<
    {
      prompt: string;
      num_inference_steps: number;
      guidance_scale: number;
      negative_prompt: string;
      scheduler: string;
      num_outputs: number;
      complexity: number;
      artType: string;
      height: number;
      width: number;
    },
    unknown,
    undefined
  >;
}
type GenerateFormValues = z.infer<typeof generateFormSchema>;
const defaultValues = {
  prompt: '',
  num_inference_steps: 4,
  guidance_scale: 0.5,
  negative_prompt:
    'worst quality, realistic, lowres, bad anatomy, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry, grid, multiple sections, multiple images, border',
  scheduler: 'K_EULER',
  num_outputs: 1,
  artType: 'vibrant',
  colors: [],
  complexity: 0.2,
  height: 400,
  width: 400,
};

const generateprompt = ({ artType }: { artType: string }) => {
  let currPrompt =
    '(Flat UI)(Flat Colors)(Minimal)(Sharp) Vector graphic Illustration, Svg, Sharp, cartoon, single image, no border';
  if (artType === 'vibrant') {
    currPrompt += ` a vibrant and colorful illustration`;
  } else if (artType === 'artistic') {
    currPrompt += ` an artistic and abstract illustration`;
  } else if (artType === 'monochrome') {
    currPrompt += ` a monochrome illustration with complexity`;
  }
  return currPrompt;
};
export const useGenerate = ({
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
    mode: 'onSubmit',

    // Set default values so that the form inputs are controlled components.
    defaultValues,
  });

  // Global App Store
  const { setFormData } = useAppStore((state) => ({
    formData: state.formData,
    setFormData: state.setFormData,
  }));

  useEffect(() => {
    if (response && response.image_url) {
      setResponse({
        image_url: response.image_url,
        model_latency_ms: modelLatency ?? 0,
        id: id ?? nanoid(),
      });

      // Save data to global store when new image url generated
      setFormData(response as IllustratorGenerateResponse);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      form.setValue('prompt', suggestion);
    },
    [form],
  );

  const handleSubmitButton = useCallback(async (values: GenerateFormValues) => {
    setIsLoading(true);
    setResponse(null);
    try {
      const request: IllustratorGenerateRequest = {
        ...defaultValues,
        prompt: `${generateprompt({ artType: values.artType })} ${values.prompt}`,
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
  return {
    handleSubmitButton,
    handleSuggestionClick,
    response,
    error,
    isLoading,
    form,
  };
};
