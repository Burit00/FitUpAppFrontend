import { HttpClient } from '@/api/http/http-client';
import { env } from '@/environment/env';

const FitUpHttpClient = new HttpClient({
  baseUrl: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { FitUpHttpClient };
