'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { AuthSearchEnum } from '@/app/auth/enums/AuthSearchEnum';
import AuthForm from '@/app/auth/components/AuthForm';

const signInFormSchema = z.object({
  login: z.string().min(1, 'Pole wymagane'),
  password: z.string().min(1, 'Pole wymagane'),
});

type SignInForm = z.infer<typeof signInFormSchema>;

const formElements: (Partial<React.InputHTMLAttributes<HTMLInputElement>> & {
  name: keyof SignInForm;
  label: string;
})[] = [
  {
    name: 'login',
    label: 'Login',
    placeholder: 'Login',
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

function LoginForm({ className }: LoginFormProps) {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInForm) => {
    console.log('success', data);
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
          <Link href={'/'} className={'underline'}>
            Zapomnialeś hasła?
          </Link>
        </div>
        <Button type={'submit'} className={'w-full mt-10'}>
          Zaloguj
        </Button>
        <p>
          Nie posiadasz jeszcze konta?{' '}
          <Link href={'/auth?auth=' + AuthSearchEnum.SIGNUP} className={'text-primary underline'}>
            Zarejestruj się
          </Link>
        </p>
      </AuthForm>
    </Form>
  );
}

export default LoginForm;
