'use client';

import Header from '@components/layouts/NavigationLayout/_components/Header';
import { LogoutButton } from '@features/auth/components/buttons/LogoutButton';

export const AuthHeader = () => {
  return <Header buttons={[<LogoutButton key={'logout'} />]} />;
};
