import Replicate from 'replicate';

import { ENV_KEY, getEnv } from '@/lib/env';

import { IllustratorRequest, IllustratorResponse } from './types';

export class ReplicateClient {
  replicate: Replicate;

  constructor(apiKey: string) {
    this.replicate = new Replicate({
      auth: apiKey,
    });
  }

  /**
   * Generate a QR code.
   */
  generateQrCode = async (request: IllustratorRequest): Promise<string> => {
    const output = (await this.replicate.run(
      'lucataco/sdxl-lightning-4step:727e49a643e999d602a896c774a0658ffefea21465756a6ce24b7ea4165eba6a',
      {
        input: {
          width: 512,
          height: 512,
          prompt: request.prompt,
          qr_conditioning_scale: request.guidance_scale,
          num_inference_steps: 4,
          guidance_scale: request.guidance_scale,
          negative_prompt: request.negative_prompt,
        },
      },
    )) as IllustratorResponse;

    if (!output) {
      throw new Error('Failed to generate QR code');
    }

    return output[0];
  };
}

const apiKey = getEnv(ENV_KEY.REPLICATE_API_KEY);
if (!apiKey) {
  throw new Error('REPLICATE_API_KEY is not set');
}
export const replicateClient = new ReplicateClient(apiKey);
