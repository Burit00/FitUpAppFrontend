import React, { FC, ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { Button, Input, InputProps } from '@components/ui';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { cn } from '@/utils';

type InputWithStepButtonsProps = InputProps & {
  buttonStepValue: number;
};

const InputWithStepButtons: FC<InputWithStepButtonsProps> = forwardRef<HTMLInputElement, InputWithStepButtonsProps>(
  ({ buttonStepValue, ...props }: InputWithStepButtonsProps, ref: ForwardedRef<HTMLInputElement>) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current);
    const triggerOnChangeCall = () => {
      inputRef.current.focus();
      const event = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    };

    return (
      <div className={'flex items-end gap-3 w-full'}>
        <Button
          type={'button'}
          variant={'dark'}
          onClick={() => {
            if (inputRef.current.min === '') {
              inputRef.current.valueAsNumber -= buttonStepValue;
            } else {
              const min = Number(inputRef.current.min);
              const newValue = inputRef.current.valueAsNumber - buttonStepValue;
              inputRef.current.valueAsNumber = newValue <= min ? min : newValue;
            }

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
            if (inputRef.current.max === '') {
              inputRef.current.valueAsNumber += buttonStepValue;
            } else {
              const max = Number(inputRef.current.max);
              const newValue = inputRef.current.valueAsNumber + buttonStepValue;
              inputRef.current.valueAsNumber = newValue >= max ? max : newValue;
            }

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
