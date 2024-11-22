'use client';

import Header from '@components/layouts/NavigationLayout/_components/Header';
import { UserInfoButton } from '@features/auth/components/buttons/UserInfoButton';

export const AuthHeader = () => {
  return <Header buttons={[<UserInfoButton key={'logout'} />]} />;
};
