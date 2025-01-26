'use client';

import * as React from 'react';
import { useEffect, useId, useImperativeHandle, useRef, useState } from 'react';

import { cn } from '@/utils';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/ui/icon';
import { Button } from './button';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';

export type InputProps = {
  label?: string;
  fieldClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, className, type, ...props }, ref) => {
  const id = useId();
  const [inputType, setInputType] = useState<typeof type>(type);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (!isMounted.current) return;

    inputRef.current?.focus();
  }, [inputType]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const inputIcon = inputType === 'password' ? HiEye : HiEyeSlash;

  const toggleInputType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <div className={cn('w-full grid items-center gap-1.5 relative', props.fieldClassName)}>
      {label && (
        <Label htmlFor={id} className={'ml-2'}>
          {label}
        </Label>
      )}
      <input
        id={id}
        type={inputType}
        className={cn(
          'flex h-10 w-full rounded border-[2px] border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          className,
        )}
        ref={inputRef}
        {...props}
      />
      {type === 'password' && (
        <Button
          tabIndex={-1}
          type={'button'}
          variant={'ghost'}
          size={'icon'}
          className={'text-xl absolute right-0 bottom-0 hover:bg-muted/20 rounded-l-none'}
          onClick={toggleInputType}
        >
          <Icon icon={inputIcon} />
        </Button>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
