'use client';

import * as React from 'react';
import { useId, useState } from 'react';

import { cn } from '@/utils';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/ui/icon';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Button } from './button';

export type InputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, className, type, ...props }, ref) => {
  const id = useId();
  const [inputType, setInputType] = useState<typeof type>(type);

  const inputIcon = inputType === 'password' ? FaEye : FaEyeSlash;

  const toggleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <div className={'w-full grid items-center gap-1.5 relative'}>
      {label && (
        <Label htmlFor={id} className={'ml-2'}>
          {label}
        </Label>
      )}
      <input
        id={id}
        type={inputType}
        className={cn(
          'flex h-10 w-full rounded border-[2px] border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
      {type === 'password' && (
        <Button
          tabIndex={-1}
          type={'button'}
          onClick={toggleInputType}
          className={'absolute right-0 bottom-0 hover:bg-primary/20'}
          variant={'ghost'}
          size={'icon'}
        >
          <Icon icon={inputIcon} />
        </Button>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
