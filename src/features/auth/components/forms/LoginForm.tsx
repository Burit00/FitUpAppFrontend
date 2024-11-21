'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { AuthForm } from './AuthForm';
import { useAuth } from '@/hooks/useAuth';
import { TSignIn } from '@features/auth/types';
import { SignInSchema } from '@features/auth/schemas';
import React, { useState } from 'react';
import { AuthActionErrorResultMap } from '@features/auth/maps';

const formElements: (Partial<React.InputHTMLAttributes<HTMLInputElement>> & {
  name: keyof TSignIn;
  label: string;
})[] = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    type: 'text',
  },
  {
    name: 'password',
    label: 'Hasło',
    placeholder: 'Hasło',
    type: 'password',
  },
];

type LoginFormProps = {
  className?: string;
};

export const LoginForm = ({ className }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const authContext = useAuth();
  const form = useForm<TSignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TSignIn) => {
    setIsLoading(true);
    authContext
      .login(data)
      .catch((err) => setError(AuthActionErrorResultMap.get(err.message)))
      .finally(() => setIsLoading(false));
  };

  return (
    <Form {...form}>
      <AuthForm onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <h1 className={'text-primary text-center'}>Witaj z powrotem!</h1>
        {formElements.map((element) => {
          return (
            <FormField
              key={element.name}
              control={form.control}
              name={element.name}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input {...field} {...element} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          );
        })}
        <div className={'w-full text-right'}>
          <Link href={'/reset-password-request'} className={'underline'}>
            Zapomniałeś hasła?
          </Link>
        </div>
        <div className={'w-full'}>
          <Button isLoading={isLoading} type={'submit'} className={'w-full mt-10'}>
            Zaloguj
          </Button>
          {error && <p className={'text-destructive text-center'}>{error}</p>}
        </div>
        <p>
          Nie posiadasz jeszcze konta?{' '}
          <Link href={'/signup'} className={'text-primary underline text-nowrap'}>
            Zarejestruj się
          </Link>
        </p>
      </AuthForm>
    </Form>
  );
};
