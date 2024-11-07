import { forwardRef } from 'react';
import { cn } from '@/utils';
import { BackButton } from '@/components/BackButton';

type PageBarProps = {
  leftSlot?: React.ReactNode;
  centerSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const PageBar = forwardRef<HTMLDivElement, PageBarProps>((props, ref) => {
  const { leftSlot, rightSlot, centerSlot, ...divProps } = props;

  const slots = [leftSlot ?? <BackButton />, centerSlot, rightSlot];

  return (
    <div
      ref={ref}
      {...divProps}
      className={cn(
        'sticky top-0 z-[100] w-full flex justify-between items-center rounded bg-background2 p-2',
        props.className,
      )}
    >
      {slots.map((slot, index) => (
        <div key={index} className={'flex gap-2'}>
          {slot}
        </div>
      ))}
    </div>
  );
});

PageBar.displayName = 'PageBar';

export { PageBar };