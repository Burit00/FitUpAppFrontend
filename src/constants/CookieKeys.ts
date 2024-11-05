export const CookieKeys = {
  USER: 'USER',
} as const;

export type TCookieKey = keyof typeof CookieKeys;
