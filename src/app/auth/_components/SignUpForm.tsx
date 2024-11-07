'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { AuthSearchEnum } from '@/app/auth/enums/AuthSearchEnum';
import AuthForm from '@/app/auth/_components/AuthForm';
import { usePathname, useRouter } from 'next/navigation';
import { signUp } from '@features/auth/actions/commands/sign-up';
import { useSearchParams } from '@/hooks/useSearchParams';
import { TSignUp } from '@features/auth/types';
import { SignUpSchema } from '@features/auth/schemas';

const formElements: (Partial<React.InputHTMLAttributes<HTMLInputElement>> & {
  name: keyof TSignUp;
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
  {
    name: 'confirmPassword',
    label: 'Powtórz hasło',
    placeholder: 'Powtórz hasło',
    type: 'password',
  },
];

type SignUpFormProps = {
  className?: string;
};

function SignUpForm({ className }: SignUpFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { createQueryString } = useSearchParams();

  const form = useForm<TSignUp>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const loginPageLink = pathname + '?' + createQueryString(['auth', AuthSearchEnum.LOGIN]);

  const onSubmit = async (data: TSignUp) => {
    const response = await signUp(data);
    //TODO: show toaster on action
    if (response.ok) router.push(loginPageLink);
    else console.error(await response.json());
  };

  return (
    <Form {...form}>
      <AuthForm onSubmit={form.handleSubmit(onSubmit)} className={className}>
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
        <Button type={'submit'} className={'w-full mt-10'}>
          Zarejestruj się
        </Button>
        <p>
          Masz już konto?{' '}
          <Link href={loginPageLink} className={'text-primary underline'}>
            Zaloguj się
          </Link>
        </p>
      </AuthForm>
    </Form>
  );
}

export default SignUpForm;
