import { cn } from '@/utils';
import { Button } from '@components/ui/button';
import { Icon } from '@components/ui/icon';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { FC } from 'react';

export type ModuleButtonProps = {
  name: string;
  link: string;
  icon: IconType;
  disabled?: boolean;
  className?: string;
};

const ModuleButton: FC<ModuleButtonProps> = (props: ModuleButtonProps) => {
  return (
    <Button
      variant={'dark'}
      disabled={props.disabled}
      className={cn(
        'w-full h-full flex-col justify-center items-center gap-1 md:gap-3 lg:aspect-square',
        props.className,
      )}
      asChild
    >
      <Link href={props.disabled ? '' : props.link} aria-disabled={props.disabled}>
        <Icon icon={props.icon} className={'text-primary text-[3rem] mt-[1rem]'} />
        <p className={'text-xl text-wrap'}>{props.name}</p>
      </Link>
    </Button>
  );
};

export { ModuleButton };
