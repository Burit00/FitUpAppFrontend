'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage, Input, InputProps } from '@components/ui';
import { TApiError } from '@api/types/api-error';
import { TResetPassword } from '@features/auth/types';
import { resetPassword } from '@features/auth/actions';
import { ResetPasswordSchema } from '@features/auth/schemas';
import { AuthErrorResultMap } from '@features/auth/maps';
import { AuthErrorResultEnum } from '@features/auth/enums';
import { AuthForm } from '@/app/(auth)/(account-actions)/_components/AuthForm';
import { AuthSuccessResultMap } from '@features/auth/maps/auth-success-result.map';
import { AuthSuccessResultEnum } from '@features/auth/enums/auth-success-result.enum';

const FormElements: (InputProps & {
  name: keyof TResetPassword;
  label: string;
})[] = [
  {
    type: 'email',
    label: 'Email',
    name: 'email',
    placeholder: 'Email',
    disabled: true,
  },
  {
    type: 'password',
    label: 'Hasło',
    name: 'password',
    placeholder: 'Hasło',
  },
  {
    type: 'password',
    label: 'Powtórz hasło',
    name: 'confirmPassword',
    placeholder: 'Powtórz hasło',
  },
];

type ResetPasswordPageProps = {
  searchParams: {
    token: string;
    email: string;
  };
};

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: searchParams.token,
      email: searchParams.email,
    },
  });

  const onSubmit = async (data: TResetPassword) => {
    setError('');
    setSuccessMessage('');
    setIsLoading(true);
    const response = await resetPassword(data);
    setIsLoading(false);

    if (!response.ok) {
      const error: TApiError<AuthErrorResultEnum> = await response.json();
      setError(AuthErrorResultMap.get(error.code) || '');

      return;
    }
    const message = AuthSuccessResultMap.get(AuthSuccessResultEnum.RESET_PASSWORD) || '';
    setSuccessMessage(message);
  };

  return (
    <>
      <div>
        <h3>Resetuj hasło</h3>
        {!successMessage ? (
          <p>Proszę podać nowe hasło i potwierdzić je, wpisując je ponownie.</p>
        ) : (
          <p className={'text-primary '}>{successMessage}</p>
        )}
      </div>
      {!successMessage && (
        <Form {...form}>
          <AuthForm
            onSubmit={form.handleSubmit(onSubmit)}
            submitText={'Resetuj hasło'}
            errorMessage={error}
            isLoading={isLoading}
            className={'w-full flex flex-col gap-4'}
          >
            {FormElements.map((element) => (
              <FormField
                key={element.name}
                name={element.name}
                control={form.control}
                render={({ field }) => (
                  <FormItem {...field}>
                    <FormControl>
                      <Input {...element} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </AuthForm>
        </Form>
      )}
    </>
  );
}
