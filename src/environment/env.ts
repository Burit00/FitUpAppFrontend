import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url('API_URL must be a valid URL'),
});

export const env = envSchema.parse(process.env);
