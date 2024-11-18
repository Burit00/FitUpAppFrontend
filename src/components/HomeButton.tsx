'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from '@/components/ui';
import { FaHome } from 'react-icons/fa';

const HomeButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <Button ref={ref} size={'icon'} variant={'darker'} {...props} asChild>
      <Link href={'/'}>
        <FaHome />
      </Link>
    </Button>
  );
});

HomeButton.displayName = 'BackButton';

export { HomeButton };
