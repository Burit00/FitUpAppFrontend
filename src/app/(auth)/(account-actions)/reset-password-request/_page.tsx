'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordRequestSchema } from '@features/auth/schemas';
import { TResetPasswordRequest } from '@features/auth/types';
import { resetPasswordRequest } from '@features/auth/actions';
import { TApiError } from '@api/types';
import { AuthErrorResultEnum } from '@features/auth/enums';
import { AuthErrorResultMap } from '@features/auth/maps';
import { AuthSuccessResultMap } from '@features/auth/maps/auth-success-result.map';
import { AuthSuccessResultEnum } from '@features/auth/enums/auth-success-result.enum';
import { Form, FormControl, FormField, FormItem, FormMessage, Input } from '@components/ui';
import { AuthForm } from '@/app/(auth)/(account-actions)/_components/AuthForm';

export default function ResetPasswordRequestClientPage() {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(ResetPasswordRequestSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: TResetPasswordRequest) => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);
    const response = await resetPasswordRequest(data);
    setIsLoading(false);

    if (!response.ok) {
      const error: TApiError<AuthErrorResultEnum> = await response.json();
      setErrorMessage(AuthErrorResultMap.get(error.code) || '');

      return;
    }
    const message = AuthSuccessResultMap.get(AuthSuccessResultEnum.RESET_PASSWORD_REQUEST) || '';
    setSuccessMessage(message);
  };

  return (
    <>
      <div>
        <h3>Resetuj hasło</h3>
        {!successMessage ? (
          <p>
            Wpisz adres email powiązany z twoim kontem, następnie wyślemy Ci wiadomość email z linkiem do resetowania
            hasła.
          </p>
        ) : (
          <p className={'text-primary '}>{successMessage}</p>
        )}
      </div>
      {!successMessage && (
        <Form {...form}>
          <AuthForm
            onSubmit={form.handleSubmit(onSubmit)}
            submitText={'Zresetuj hasło'}
            errorMessage={errorMessage}
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
      )}
    </>
  );
}
