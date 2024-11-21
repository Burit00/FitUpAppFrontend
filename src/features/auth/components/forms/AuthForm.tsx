import { FormHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils';

const AuthForm = forwardRef<HTMLFormElement, FormHTMLAttributes<HTMLFormElement>>((props, ref) => {
  return (
    <form
      {...props}
      ref={ref}
      className={cn('h-full flex flex-col items-center justify-center gap-4', props.className)}
    />
  );
});

AuthForm.displayName = 'AuthForm';

export { AuthForm };
