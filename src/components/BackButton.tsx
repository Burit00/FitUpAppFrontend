'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';
import { Button } from '@/components/ui';

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button size={'icon'} variant={'ghost'} onClick={router.back}>
      <FaArrowLeft />
    </Button>
  );
};
