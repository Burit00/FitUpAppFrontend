export const COOKIE_KEYS = {
  USER: 'USER',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
} as const;

export type TCookieKey = keyof typeof COOKIE_KEYS;
