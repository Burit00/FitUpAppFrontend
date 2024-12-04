'use client';

import { PropsWithChildren, Suspense } from 'react';
import Navigation from '@/components/layouts/NavigationLayout/_components/Navigation';
import { Loader } from '@components/Loader';

type NavigationProps = {} & PropsWithChildren;

function NavigationLayout(props: NavigationProps) {
  return (
    <div className={'w-full flex-grow flex gap-5 p-5 overflow-auto'}>
      <Navigation />
      <div className={'flex justify-between gap-5 h-full flex-grow relative overflow-hidden'}>
        <Suspense fallback={<Loader fullSpace />}>{props.children}</Suspense>
      </div>
    </div>
  );
}

export default NavigationLayout;
