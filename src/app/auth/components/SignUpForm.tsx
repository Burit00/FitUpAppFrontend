'use client';

import React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { AuthSearchEnum } from '@/app/auth/enums/AuthSearchEnum';
import AuthForm from '@/app/auth/components/AuthForm';

const ACCOUNT_REQUIREMENTS = {
  login: {
    minLength: 8,
  },
  password: {
    minLength: 8,
    lowerCaseREGEX: /[a-z]+/,
    upperCaseREGEX: /[A-Z]+/,
    numberREGEX: /[0-9]+/,
    specialCharREGEX: /[!@#$%^&*)(+=._-]+/,
  },
};

const registerFormSchema = z
  .object({
    login: z
      .string()
      .min(1, 'Pole wymagane')
      .min(ACCOUNT_REQUIREMENTS.login.minLength, 'Login powinien mieć co najmniej 8 znaków'),
    email: z.string().min(1, 'Pole wymagane').email('Niepoprawny email'),
    password: z
      .string()
      .min(1, 'Pole wymagane')
      .min(ACCOUNT_REQUIREMENTS.password.minLength, 'Hasło powinno mieć co najmniej 8 znaków')
      .regex(ACCOUNT_REQUIREMENTS.password.lowerCaseREGEX, 'Hasło musi mieć co najmniej jedną małą literę')
      .regex(ACCOUNT_REQUIREMENTS.password.upperCaseREGEX, 'Hasło musi mieć co najmniej jedną wielką literę')
      .regex(ACCOUNT_REQUIREMENTS.password.numberREGEX, 'Hasło musi mieć co najmniej jedną cyfrę')
      .regex(ACCOUNT_REQUIREMENTS.password.specialCharREGEX, 'Hasło musi mieć co najmniej jeden znak specjalny'),
    confirmPassword: z.string().min(1, 'Pole wymagane'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Hasła nie są takie same',
        path: ['confirmPassword'],
      });
    }
  });

type RegisterForm = z.infer<typeof registerFormSchema>;

const formElements: (Partial<React.InputHTMLAttributes<HTMLInputElement>> & {
  name: keyof RegisterForm;
  label: string;
})[] = [
  {
    name: 'login',
    label: 'Login',
    placeholder: 'Login',
    type: 'text',
  },
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
  {
    name: 'confirmPassword',
    label: 'Powtoż hasło',
    placeholder: 'Powtoż hasło',
    type: 'password',
  },
];

type SignUpFormProps = {
  className?: string;
};

function SignUpForm({ className }: SignUpFormProps) {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterForm) => {
    console.log('success', data);
  };

  return (
    <Form {...form}>
      <AuthForm onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <h1 className={'text-primary text-center'}>Utwórz konto!</h1>
        {formElements.map((element) => (
          <FormField
            key={element.name}
            control={form.control}
            name={element.name as keyof RegisterForm}
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
        <Button type={'submit'} className={'w-full mt-10'}>
          Zarejestruj się
        </Button>
        <p>
          Masz już konto?{' '}
          <Link href={'/auth?auth=' + AuthSearchEnum.LOGIN} className={'text-primary underline'}>
            Zaloguj się
          </Link>
        </p>
      </AuthForm>
    </Form>
  );
}

export default SignUpForm;
