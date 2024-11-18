import React, { FC, ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { Button, Input, InputProps } from '@components/ui';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { cn } from '@/utils';

type InputWithStepButtonsProps = Omit<InputProps, 'step'> & {
  step: number | string;
};

const InputWithStepButtons: FC<InputWithStepButtonsProps> = forwardRef<HTMLInputElement, InputWithStepButtonsProps>(
  ({ step, ...props }: InputWithStepButtonsProps, ref: ForwardedRef<HTMLInputElement>) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current);
    const triggerOnChangeCall = () => {
      const event = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    };

    return (
      <div className={'flex items-end gap-3 w-full'}>
        <Button
          type={'button'}
          variant={'dark'}
          onClick={() => {
            inputRef.current.valueAsNumber -= +step;
            triggerOnChangeCall();
          }}
        >
          <FaMinus />
        </Button>
        <Input
          ref={inputRef}
          type={'number'}
          inputMode={'numeric'}
          min={0}
          {...props}
          className={cn('flex-grow', props.className)}
        />
        <Button
          type={'button'}
          variant={'dark'}
          onClick={() => {
            inputRef.current.valueAsNumber += +step;
            triggerOnChangeCall();
          }}
        >
          <FaPlus />
        </Button>
      </div>
    );
  },
);

InputWithStepButtons.displayName = 'InputWithStepButtons';

export { InputWithStepButtons, type InputWithStepButtonsProps };
