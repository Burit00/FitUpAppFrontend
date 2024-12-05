import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.string().url('API_URL must be a valid URL'),
  APP_NAME: z.string(),
});

type TEnvironment = z.infer<typeof envSchema>;

const publicEnv: TEnvironment = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || '',
};

export const env: TEnvironment = envSchema.parse(publicEnv);
