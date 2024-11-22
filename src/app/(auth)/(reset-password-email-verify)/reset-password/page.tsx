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
import { AuthForm } from '@/app/(auth)/(reset-password-email-verify)/_components/AuthForm';

const FormElements: (InputProps & {
  name: keyof TResetPassword;
  label: string;
})[] = [
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
    userId: string;
  };
};

export default function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: searchParams.token,
      userId: searchParams.userId,
    },
  });

  const onSubmit = async (data: TResetPassword) => {
    setError('');
    setIsLoading(true);
    const response = await resetPassword(data);
    setIsLoading(false);

    if (!response.ok) {
      const error: TApiError = await response.json();
      setError(AuthErrorResultMap.get(error.code as AuthErrorResultEnum));
    }
  };

  return (
    <Form {...form}>
      <AuthForm
        onSubmit={form.handleSubmit(onSubmit)}
        title={'Resetuj hasło'}
        submitText={'Zresetuj hasło'}
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
  );
}