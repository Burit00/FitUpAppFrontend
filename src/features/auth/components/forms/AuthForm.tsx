import React, { FormHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils';
import { Button } from '@components/ui';

type AuthFormProps = FormHTMLAttributes<HTMLFormElement> & {
  title: string;
  submitText: string;
  isLoading?: boolean;
  errorMessage?: string;
  successMessage?: string;
};

const AuthForm = forwardRef<HTMLFormElement, AuthFormProps>(
  ({ title, submitText, isLoading, errorMessage, successMessage, ...props }, ref) => {
    return (
      <form
        {...props}
        ref={ref}
        className={cn('h-full flex flex-col items-center justify-center gap-4', props.className)}
      >
        <h1 className={'text-primary text-center'}>{title}</h1>
        {props.children}

        <div className={'w-full'}>
          <Button isLoading={isLoading} type={'submit'} className={'w-full mt-5'}>
            {submitText}
          </Button>
        </div>
        {errorMessage && <p className={'text-destructive text-center'}>{errorMessage}</p>}
        {successMessage && <p className={'text-primary text-center'}>{successMessage}</p>}
      </form>
    );
  },
);

AuthForm.displayName = 'AuthForm';

export { AuthForm };
