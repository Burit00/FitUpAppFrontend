'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';
import { Button, ButtonProps } from '@/components/ui';
import { FaHome } from 'react-icons/fa';
import { useCookie } from '@/hooks/useCookie';
import { COOKIE_KEYS } from '@/constants/CookieKeys';
import { UserRoleEnum } from '@features/auth/enums';
import { TUserToken } from '@features/auth/types';

const HomeButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const [user] = useCookie<TUserToken>(COOKIE_KEYS.USER);

  return (
    <Button ref={ref} size={'icon'} variant={'darker'} {...props} asChild>
      <Link href={user.roles.includes(UserRoleEnum.ADMIN) ? '/admin' : '/'}>
        <FaHome />
      </Link>
    </Button>
  );
});

HomeButton.displayName = 'BackButton';

export { HomeButton };
