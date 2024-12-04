import { Button } from '@components/ui';
import { toDateOnly } from '@/utils/date';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

type NextPreviousDayButtonBaseProps = {
  date: Date;
  className?: string;
};

type NextPreviousDayButtonProps = NextPreviousDayButtonBaseProps & {
  goNextDay?: boolean;
  children: React.ReactNode;
};

const NextPreviousDayButton: FC<NextPreviousDayButtonProps> = (props: NextPreviousDayButtonProps) => {
  const router = useRouter();

  return (
    <Button
      size={'icon'}
      variant={'outline'}
      className={props.className}
      onClick={() => {
        const date = new Date(props.date);
        date.setDate(date.getDate() + (props.goNextDay ? 1 : -1));
        router.push(`/workout/${toDateOnly(date)}`);
      }}
    >
      {props.children}
    </Button>
  );
};

export const NextDayButton: FC<NextPreviousDayButtonBaseProps> = (props: NextPreviousDayButtonBaseProps) => {
  return (
    <NextPreviousDayButton goNextDay {...props}>
      <FaChevronRight />
    </NextPreviousDayButton>
  );
};

export const PreviousDayButton: FC<NextPreviousDayButtonBaseProps> = (props: NextPreviousDayButtonBaseProps) => {
  return (
    <NextPreviousDayButton {...props}>
      <FaChevronLeft />
    </NextPreviousDayButton>
  );
};
