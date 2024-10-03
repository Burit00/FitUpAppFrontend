import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type AnimatedCounterProps = {
  value: number;
} & React.HTMLAttributes<HTMLDivElement>;

const AnimatedCounter = forwardRef<HTMLDivElement, AnimatedCounterProps>(
  ({ value, ...props }: AnimatedCounterProps, ref) => {
    const valueStringArray = value.toString().split('');

    return (
      <div {...props} ref={ref} className={cn('flex overflow-hidden', props.className)}>
        {valueStringArray.map((char: string, index: number) => {
          const oneHundred = 100;

          return (
            <div
              key={index}
              style={{ translate: `0 -${parseInt(char) * oneHundred}%` }}
              className={'relative transition-all ease-in-out duration-200 transform-gpu'}
            >
              <span className={'opacity-0'}>{char}</span>
              {Array.from({ length: 10 }).map((x, index) => {
                return (
                  <div key={index} style={{ top: `${index * oneHundred}%` }} className={'absolute'}>
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
