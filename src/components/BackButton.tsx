'use client';

import { forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';
import { Button, ButtonProps } from '@/components/ui';

const BackButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const router = useRouter();

  return (
    <Button ref={ref} size={'icon'} variant={'ghost'} onClick={router.back} {...props}>
      <FaArrowLeft />
    </Button>
  );
});

BackButton.displayName = 'BackButton';

export { BackButton };
