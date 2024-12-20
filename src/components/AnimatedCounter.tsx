import React, { forwardRef } from 'react';
import { cn } from '@/utils';

type AnimatedCounterProps = {
  value: number;
} & React.HTMLAttributes<HTMLDivElement>;

const AnimatedCounter = forwardRef<HTMLDivElement, AnimatedCounterProps>(
  ({ value, ...props }: AnimatedCounterProps, ref) => {
    const valueStringArray: string[] = value.toString().split('');

    return (
      <div {...props} ref={ref} className={cn('flex overflow-hidden', props.className)}>
        {valueStringArray.map((digit: string, index: number) => {
          return (
            <div
              key={index}
              style={{ translate: `0 -${digit}00%` }}
              className={'relative transition-all ease-in-out duration-200 transform-gpu select-none'}
            >
              <span className={'opacity-0 select-text'}>{digit}</span>
              {Array.from({ length: 10 }).map((_, index) => {
                return (
                  <div key={index} style={{ top: `${index}00%` }} className={'absolute'}>
                    {index}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  },
);

AnimatedCounter.displayName = 'AnimatedCounter';

export default AnimatedCounter;
