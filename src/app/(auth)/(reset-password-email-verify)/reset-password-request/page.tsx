'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordRequestSchema } from '@features/auth/schemas/reset-password/reset-password-request.schema';
import { Form, FormControl, FormField, FormItem, FormMessage, Input } from '@components/ui';
import { TResetPasswordRequest } from '@features/auth/types';
import React, { useState } from 'react';
import { resetPasswordRequest } from '@features/auth/actions/commands/reset-pasword-request.http';
import { AuthActionErrorResultMap } from '@features/auth/maps';
import { AuthActionErrorResultEnum } from '@features/auth/enums';
import { TApiError } from '@api/types/common/api-error';
import { AuthForm } from '../_components/AuthForm';

export default function ResetPasswordRequestPage() {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(ResetPasswordRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: TResetPasswordRequest) => {
    setError('');
    setIsLoading(true);
    const response = await resetPasswordRequest(data);
    setIsLoading(false);

    if (!response.ok) {
      const error: TApiError = await response.json();
      setError(AuthActionErrorResultMap.get(error.code as AuthActionErrorResultEnum));
    } else {
    }
  };

  return (
    <Form {...form}>
      <AuthForm
        onSubmit={form.handleSubmit(onSubmit)}
        title={'Resetuj hasło'}
        description={
          'Wpisz adres email powiązany z twoim kontem, następnie wyślemy Ci mail z linkiem do resetowania hasła.'
        }
        submitText={'Zresetuj hasło'}
        errorMessage={error}
        isLoading={isLoading}
        className={'w-full flex flex-col gap-4'}
      >
        <FormField
          name={'email'}
          control={form.control}
          render={({ field }) => (
            <FormItem {...field}>
              <FormControl>
                <Input label={'Email'} placeholder={'Email'} {...field} className={'w-full'} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </AuthForm>
    </Form>
  );
}
