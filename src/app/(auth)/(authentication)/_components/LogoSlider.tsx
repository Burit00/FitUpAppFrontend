'use client';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils';
import { Logo } from '@components/ui';

const LogoSlider = () => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'h-full w-1/2 bg-background hidden lg:grid place-items-center absolute transform-gpu transition',
        pathname === '/login' ? 'translate-x-1/2' : '-translate-x-1/2',
      )}
    >
      <Logo className={'md:w-[90%] w-[80%] max-w-[500px]'} />
    </div>
  );
};
export default LogoSlider;
