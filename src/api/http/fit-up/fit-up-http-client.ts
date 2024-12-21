import { HttpClient } from '@/api/http/http-client';
import { env } from '@/environment/env';
import { getCookie } from '@/utils/cookies';
import { COOKIE_KEYS } from '@/constants/CookieKeys';
import { TUserToken } from '@features/auth/types';

const FitUpHttpClient = new HttpClient({
  baseUrl: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

FitUpHttpClient.addRequestInterceptor((request: RequestInit) => {
  const userCookie = getCookie(COOKIE_KEYS.USER);

  if (!userCookie) return request;
  const user = JSON.parse(userCookie) as TUserToken;
  request.headers = {
    ...request?.headers,
    Authorization: `Bearer ${user.accessToken}`,
  };

  return request;
});

export { FitUpHttpClient };
