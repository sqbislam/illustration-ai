import { NextRequest } from 'next/server';

import { replicateClient } from '@/lib/ReplicateClient';
import {
  IllustratorGenerateRequest,
  IllustratorGenerateResponse,
} from '@/lib/service';
// import { Ratelimit } from '@upstash/ratelimit';
import { nanoid } from '@/lib/utils';

/**
 * Validates a request object.
 *
 * @param {QrGenerateRequest} request - The request object to be validated.
 * @throws {Error} Error message if URL or prompt is missing.
 */

const validateRequest = (request: IllustratorGenerateRequest) => {
  if (!request.prompt) {
    throw new Error('Prompt is required');
  }
};

// const ratelimit = new Ratelimit({
//   redis: kv,
//   // Allow 20 requests from the same IP in 1 day.
//   limiter: Ratelimit.slidingWindow(20, '1 d'),
// });

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as IllustratorGenerateRequest;

  // const ip = request.ip ?? '127.0.0.1';
  // const { success } = await ratelimit.limit(ip);

  // if (!success && process.env.NODE_ENV !== 'development') {
  //   return new Response('Too many requests. Please try again after 24h.', {
  //     status: 429,
  //   });
  // }

  try {
    validateRequest(reqBody);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 });
    }
  }

  const id = nanoid();
  const startTime = performance.now();

  const imageUrl = await replicateClient.generateQrCode({
    height: 512,
    width: 512,
    prompt: `(Flat UI)(Flat Colors)(Flat Icon)(Minimal) Vector graphic Illustration, Svg, Sharp, cartoon,${reqBody.prompt},`,
    num_inference_steps: reqBody.num_inference_steps,
    guidance_scale: reqBody.guidance_scale,
    negative_prompt:
      'Longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, blurry',
  });

  const endTime = performance.now();
  const durationMS = endTime - startTime;

  // convert output to a blob object
  // const file = await fetch(imageUrl).then((res) => res.blob());

  // upload & store in Vercel Blob
  // const { url } = await put(`${id}.png`, file, { access: "public" });

  //   await kv.hset(id, {
  //     prompt: reqBody.prompt,
  //     image: url,
  //     website_url: reqBody.url,
  //     model_latency: Math.round(durationMS),
  //   });

  const response: IllustratorGenerateResponse = {
    image_url: imageUrl,
    model_latency_ms: Math.round(durationMS),
    id: id,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
