import { HttpClient } from '@/api/http/http-client';
import { env } from '@/environment/env';
import { getCookie } from '@/utils/cookies';
import { COOKIE_KEYS } from '@/constants/CookieKeys';
import { UserTokenSchema } from '@features/auth/schemas';

const FitUpHttpClient = new HttpClient({
  baseUrl: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

FitUpHttpClient.addRequestInterceptor((request: RequestInit) => {
  const userString = getCookie(COOKIE_KEYS.USER);
  if (!userString) return request;
  const user = UserTokenSchema.parse(JSON.parse(userString));

  request.headers = {
    ...request?.headers,
    Authorization: `Bearer ${user.accessToken}`,
  };

  return request;
});

export { FitUpHttpClient };
