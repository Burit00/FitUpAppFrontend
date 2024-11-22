export type TApiError<T = string> = {
  code: T;
  message: string;
};
