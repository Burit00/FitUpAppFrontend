import { HttpClient } from '@/api/http/http-client';
import { env } from '@/environment/env';
import { getCookie } from '@/utils/cookies';
import { TUserToken } from '@/api/types/auth/TUserToken';
import { COOKIE_KEYS } from '@/constants/CookieKeys';

const FitUpHttpClient = new HttpClient({
  baseUrl: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

FitUpHttpClient.addRequestInterceptor((request: RequestInit) => {
  const userString = getCookie(COOKIE_KEYS.USER);
  if (!userString) return request;
  const user = JSON.parse(userString) satisfies TUserToken as TUserToken;

  request.headers = {
    ...request?.headers,
    Authorization: `Bearer ${user.accessToken}`,
  };

  return request;
});

export default FitUpHttpClient;
