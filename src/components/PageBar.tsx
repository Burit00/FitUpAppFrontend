import { forwardRef } from 'react';
import { cn } from '@/utils';
import { HomeButton } from '@components/HomeButton';

type PageBarProps = {
  leftSlot?: React.ReactNode;
  centerSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const PageBar = forwardRef<HTMLDivElement, PageBarProps>((props, ref) => {
  const { leftSlot, rightSlot, centerSlot, ...divProps } = props;

  return (
    <div
      ref={ref}
      {...divProps}
      className={cn(
        'sticky top-0 z-20 w-full flex items-center rounded bg-background2 p-2 text-nowrap',
        props.className
      )}
    >
      <div className={'flex gap-2 w-full'}>{leftSlot ?? <HomeButton />}</div>
      <div className={'flex gap-2'}>{centerSlot}</div>
      <div className={'flex gap-2 justify-end w-full'}>{rightSlot}</div>
    </div>
  );
});

PageBar.displayName = 'PageBar';

export { PageBar };
