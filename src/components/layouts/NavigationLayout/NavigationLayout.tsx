'use client';

import { PropsWithChildren } from 'react';
import Navigation from '@/components/layouts/NavigationLayout/_components/Navigation';

type NavigationProps = {} & PropsWithChildren;

function NavigationLayout(props: NavigationProps) {
  return (
    <div className={'w-full flex-grow flex gap-5 p-5 overflow-auto'}>
      <Navigation />
      <div className={'flex justify-between gap-5 h-full flex-grow'}>{props.children}</div>
    </div>
  );
}

export default NavigationLayout;
