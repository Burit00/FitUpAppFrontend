import { HttpStatusEnum } from '@/api/enums/HttpStatusEnum';

export type ApiResponse<T> =
  | {
      data: T;
      status: HttpStatusEnum.OK | HttpStatusEnum.CREATED | HttpStatusEnum.NO_CONTENT;
    }
  | {
      status:
        | HttpStatusEnum.BAD_REQUEST
        | HttpStatusEnum.UNAUTHORIZED
        | HttpStatusEnum.FORBIDDEN
        | HttpStatusEnum.NOT_FOUND
        | HttpStatusEnum.INTERNAL_SERVER_ERROR;
      message: string;
    };
