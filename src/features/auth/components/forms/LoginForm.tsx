'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { AuthForm } from './AuthForm';
import { TSignIn } from '@features/auth/types';
import { SignInSchema } from '@features/auth/schemas';
import React, { useState } from 'react';
import { AuthErrorResultMap } from '@features/auth/maps';
import { AuthErrorResultEnum } from '@features/auth/enums';
import { useAuth } from '@features/auth/contexts/AuthProvider';

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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const authContext = useAuth();
  const form = useForm<TSignIn>({
    resolver: zodResolver(SignInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TSignIn) => {
    setIsLoading(true);
    try {
      await authContext.login(data);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(AuthErrorResultMap.get(err.message as AuthErrorResultEnum) || '');
        setIsLoading(false);
      }
    }
  };

  return (
    <Form {...form}>
      <AuthForm
        onSubmit={form.handleSubmit(onSubmit)}
        className={className}
        title={'Witaj z powrotem!'}
        submitText={'Zaloguj się'}
        errorMessage={errorMessage}
        isLoading={isLoading}
      >
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
      </AuthForm>
    </Form>
  );
};
