import { HttpClient } from '@/api/http/http-client';
import { env } from '@/environment/env';
import { getCookie } from '@/utils/cookies';
import { COOKIE_KEYS } from '@/constants/CookieKeys';

const FitUpHttpClient = new HttpClient({
  baseUrl: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

FitUpHttpClient.addRequestInterceptor((request: RequestInit) => {
  const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
  if (!token) return request;

  request.headers = {
    ...request?.headers,
    Authorization: `Bearer ${token}`,
  };

  return request;
});

export { FitUpHttpClient };
