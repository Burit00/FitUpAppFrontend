export const COOKIE_KEYS = {
  USER: 'USER'
} as const;

export type TCookieKey = keyof typeof COOKIE_KEYS;
