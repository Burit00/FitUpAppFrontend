'use client';

import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { AuthForm } from './AuthForm';
import { signUp } from '@features/auth/actions/commands/sign-up';
import { TSignUp } from '@features/auth/types';
import { SignUpSchema } from '@features/auth/schemas';
import { AuthErrorResultMap } from '@features/auth/maps';
import { TApiError } from '@api/types/api-error';
import { AuthErrorResultEnum } from '@features/auth/enums';
import { AuthSuccessResultMap } from '@features/auth/maps/auth-success-result.map';
import { AuthSuccessResultEnum } from '@features/auth/enums/auth-success-result.enum';

const formElements: (Partial<React.InputHTMLAttributes<HTMLInputElement>> & {
  name: keyof TSignUp;
  label: string;
})[] = [
  {
    id: 'signup_email',
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    autoFocus: true,
    type: 'text',
  },
  {
    id: 'signup_password',
    name: 'password',
    label: 'Hasło',
    placeholder: 'Hasło',
    type: 'password',
  },
  {
    id: 'signup_confirmPassword',
    name: 'confirmPassword',
    label: 'Powtórz hasło',
    placeholder: 'Powtórz hasło',
    type: 'password',
  },
];

type SignUpFormProps = {
  className?: string;
};

export const SignUpForm: FC<SignUpFormProps> = ({ className }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const form = useForm<TSignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TSignUp): Promise<void> => {
    setError('');
    setSuccessMessage('');
    setIsLoading(true);
    const response = await signUp(data).finally(() => setIsLoading(false));

    if (!response.ok) {
      const error: TApiError<AuthErrorResultEnum> = await response.json();
      setError(AuthErrorResultMap.get(error.code));

      return;
    }
    const success = AuthSuccessResultMap.get(AuthSuccessResultEnum.SIGN_UP);
    setSuccessMessage(success);
  };

  return (
    <Form {...form}>
      <AuthForm
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
        autoComplete={'off'}
        title={'Utwórz konto!'}
        submitText={'Zarejestruj się'}
        isLoading={isLoading}
        successMessage={successMessage}
        errorMessage={error}
      >
        {formElements.map((element) => (
          <FormField
            key={element.name}
            control={form.control}
            name={element.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} {...element} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </AuthForm>
    </Form>
  );
};
