'use client';

import React, { FC, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { AuthForm } from './AuthForm';
import { signUp } from '@features/auth/actions/commands/sign-up';
import { TSignUp } from '@features/auth/types';
import { SignUpSchema } from '@features/auth/schemas';
import { AuthActionErrorResultMap } from '@features/auth/maps';

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
    setIsLoading(true);
    const response = await signUp(data).finally(() => setIsLoading(false));

    if (!response.ok) {
      const error = await response.json();
      setError(AuthActionErrorResultMap.get(error.code));
    }
  };

  return (
    <Form {...form}>
      <AuthForm onSubmit={form.handleSubmit(onSubmit)} className={className} autoComplete={'off'}>
        <h1 className={'text-primary text-center'}>Utwórz konto!</h1>
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
        <div className={'w-full'}>
          <Button isLoading={isLoading} type={'submit'} className={'w-full mt-10'}>
            Zarejestruj się
          </Button>
          {error && <p className={'text-destructive text-center'}>{error}</p>}
        </div>
        <p>
          Masz już konto?{' '}
          <Link href={'/login'} className={'text-primary underline text-nowrap'}>
            Zaloguj się
          </Link>
        </p>
      </AuthForm>
    </Form>
  );
};
