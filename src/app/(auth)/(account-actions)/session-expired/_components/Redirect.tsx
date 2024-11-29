'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

type RedirectProps = {
  href: string;
  delay?: number;
};

export const Redirect = ({ href, delay = 0 }: RedirectProps) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === href) return;
    const timeoutId = setTimeout(() => {
      router.replace(href);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [router, pathname, href, delay]);

  return <></>;
};
