import { Link } from '@/roots/links';
import { useRouter } from 'next/navigation';
import { Button } from '@components/ui';
import React from 'react';

type NavigationButtonProps = {
  link: Link;
};

export const NavigationButton = ({ link }: NavigationButtonProps) => {
  const router = useRouter();

  const redirectToLink = () => {
    router.push(link.disabled ? '' : link.link);
  };
  const LinkIcon = link.icon;

  return (
    <Button
      variant={'darker'}
      name={link.name}
      disabled={link.disabled}
      onClick={redirectToLink}
      className={'justify-between gap-4 w-full text-md'}
    >
      <span>{link.name}</span>
      <LinkIcon />
    </Button>
  );
};
