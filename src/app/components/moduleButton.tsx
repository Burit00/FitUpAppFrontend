import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
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
    <Link href={props.disabled ? '' : props.link} className={cn('lg:aspect-square', props.className)}>
      <Button
        variant={'secondary'}
        disabled={props.disabled}
        className={cn('w-full h-full flex-col justify-center items-center gap-1 md:gap-3 p-5 bg-background2')}
      >
        <Icon icon={props.icon} className={'text-primary text-[3rem] mt-[1rem]'} />
        <p className={'text-xl text-wrap'}>{props.name}</p>
      </Button>
    </Link>
  );
};

export { ModuleButton };
