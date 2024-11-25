import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';
import { Loader } from '@components/Loader';

const buttonVariants = cva(
  'gap-2 inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-text hover:bg-primary/80',
        dark: 'bg-background2 text-primary hover:bg-background2/90',
        darker: 'bg-background text-primary hover:bg-background/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80 focus-visible:ring-destructive',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/80 focus-visible:ring-warning',
        outline:
          'border-[2px] border-primary border-solid text-primary bg-transparent underline hover:bg-background/20',
        ghost: 'bg-background/30 hover:bg-background/50 hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { isLoading?: boolean; asChild?: boolean };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, asChild = false, ...props }, ref) => {
    if (asChild) return <Slot className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={props.disabled || isLoading}
      >
        {isLoading && <Loader size={'sm'} fullSpace={false} />}
        {props.children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
