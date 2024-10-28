import { HttpStatusEnum } from '@/api/enums/HttpStatusEnum';

export type THttpError = {
  status: HttpStatusEnum;
  message: string;
};

export function isHttpError(error: unknown): error is THttpError {
  return typeof error === 'object' && error !== null && 'status' in error && 'message' in error;
}

export const InternalServerError: THttpError = {
  status: HttpStatusEnum.INTERNAL_SERVER_ERROR,
  message: 'Ups, co poszło nie tak. Spróbuj ponownie za kilka minut.',
} satisfies THttpError as THttpError;
