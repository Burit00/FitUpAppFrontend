'use server';

import { TSignUp } from '@/api/types/auth/TSignUp';
import { ApiResponse } from '@/api/types/common/ApiResponse';
import { HttpClient } from '@/api/actions/http-client';
import { UUID } from 'node:crypto';
import { HttpStatusEnum } from '@/api/enums/HttpStatusEnum';

export const signUp = async (data: TSignUp): Promise<ApiResponse<UUID>> => {
  const res = await HttpClient.postHttp('account/sign-up', data);

  switch (res.status as HttpStatusEnum) {
    case HttpStatusEnum.CREATED:
      return {
        data: (await res.json()) as UUID,
        status: res.status,
      };
    case HttpStatusEnum.BAD_REQUEST:
      return {
        status: res.status,
        message: (await res.json()) as string,
      };
    default:
      return {
        status: res.status,
        message: 'Ups, co poszło nie tak. Sprobój ponownie za kilka minut.',
      };
  }
};
