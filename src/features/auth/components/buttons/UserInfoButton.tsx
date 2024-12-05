import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa6';
import { LuLogOut } from 'react-icons/lu';
import { Button, Icon } from '@components/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { useAuth } from '@features/auth/contexts/AuthProvider';

export const UserInfoButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  if (!user) return logout();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal>
      <PopoverTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <Icon icon={FaRegUser} />
        </Button>
      </PopoverTrigger>
      <PopoverContent title={'user profile'} className={'transform-gpu -translate-x-[1rem] translate-y-[1rem]'}>
        <p>
          Email: <span className={'text-foreground'}>{user?.email}</span>
        </p>
        <Button
          className={'w-full'}
          variant={'outline'}
          onClick={() => {
            setIsOpen(false);
            logout();
          }}
        >
          <LuLogOut />
          Wyloguj
        </Button>
      </PopoverContent>
    </Popover>
  );
};
