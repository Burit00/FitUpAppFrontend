'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui';
import { AuthSearchEnum } from '@/app/auth/enums/AuthSearchEnum';
import AuthForm from '@/app/auth/_components/AuthForm';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { TSignIn } from '@features/auth/types';
import { SignInSchema } from '@features/auth/schemas';

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

function LoginForm({ className }: LoginFormProps) {
  const pathname = usePathname();
  const authContext = useAuth();
  const form = useForm<TSignIn>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: TSignIn) => {
    authContext.login(data);
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
            Zapomniałeś hasła?
          </Link>
        </div>
        <Button type={'submit'} className={'w-full mt-10'}>
          Zaloguj
        </Button>
        <p>
          Nie posiadasz jeszcze konta?{' '}
          <Link href={pathname + '?auth=' + AuthSearchEnum.SIGNUP} className={'text-primary underline'}>
            Zarejestruj się
          </Link>
        </p>
      </AuthForm>
    </Form>
  );
}

export default LoginForm;
