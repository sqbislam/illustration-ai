export type IllustratorRequest = {
  width?: number;
  height?: number;
  prompt?: string;
  scheduler?: Schedulers;
  num_outputs?: number;
  guidance_scale?: number;
  apply_watermark?: boolean;
  negative_prompt?: string;
  prompt_strength?: number;
  num_inference_steps?: number;
  disable_safety_checker?: boolean;
};
enum Schedulers {
  DDIM = 'DDIM',
  DPMSolverMultistep = 'DPMSolverMultistep',
  HeunDiscrete = 'HeunDiscrete',
  K_EULER_ANCESTRAL = 'K_EULER_ANCESTRAL',
  K_EULER = 'K_EULER',
  PNDM = 'PNDM',
  DPMKarras = 'DPM++2MKarras',
  DPMSolver = 'DPMSolver++',
}

export type IllustratorResponse = [string];
