import { FC, ReactNode } from 'react';
import { TbLoader2 } from 'react-icons/tb';
import { cn } from '@/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const loaderVariants = cva('animate-spin repeat-infinite m-2', {
  variants: {
    color: {
      default: 'text-foreground',
      primary: 'text-primary',
    },
    size: {
      default: 'text-[3rem]',
      sm: 'text-[1rem] m-0',
      lg: 'text-[5rem] m-4',
    },
    defaultVariants: {
      color: 'default',
      size: 'default',
    },
  },
});

export interface LoaderProps extends VariantProps<typeof loaderVariants> {
  isLoading?: boolean;
  fullSpace?: boolean;
  className?: string;
  children?: ReactNode;
}

export const Loader: FC<LoaderProps> = ({
  color,
  size,
  className,
  children,
  fullSpace = true,
  isLoading = true,
}: LoaderProps) => {
  if (!isLoading) return children || null;

  const LoaderComponent = (
    <TbLoader2 className={cn(loaderVariants({ color: color || 'default', size: size || 'default', className }))} />
  );

  if (fullSpace) {
    return (
      <div className={'w-full h-full flex justify-center items-center absolute z-[50] top-0 left-0 bg-background'}>
        {LoaderComponent}
      </div>
    );
  }

  return LoaderComponent;
};
