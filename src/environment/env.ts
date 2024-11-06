import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url('API_URL must be a valid URL'),
});

type TEnvironment = z.infer<typeof envSchema>;

export const env: TEnvironment = envSchema.parse(process.env);
