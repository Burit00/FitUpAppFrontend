import { FormHTMLAttributes } from 'react';
import { cn } from '@/utils';
import { Button } from '@components/ui';

type AuthFormProps = FormHTMLAttributes<HTMLFormElement> & {
  title: string;
  submitText: string;
  description?: string;
  errorMessage?: string;
  successMessage?: string;
  isLoading?: boolean;
};

export const AuthForm = ({
  title,
  description,
  errorMessage,
  successMessage,
  submitText,
  isLoading,
  ...props
}: AuthFormProps) => {
  return (
    <form {...props} className={cn('h-full flex flex-col items-center justify-center gap-4', props.className)}>
      <div>
        <h3>Resetuj hasło</h3>
        {description && <p>{description}</p>}
      </div>
      {props.children}
      <div className={'w-full'}>
        <Button isLoading={isLoading} type={'submit'} className={'w-full'}>
          Zresetuj hasło
        </Button>
        {errorMessage && <p className={'text-destructive text-center'}>{errorMessage}</p>}
      </div>
    </form>
  );
};
