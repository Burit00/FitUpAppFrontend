import { FC, PropsWithChildren } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui';
import { useRouter } from 'next/navigation';
import { TBrowseWorkout } from '@features/workouts/types/workout/browse-workout.type';
import { toDateOnly } from '@/utils/date';
import { WorkoutDialogBody } from '@/app/(user)/calendar/_components/WorkoutDialog/WorkoutDialogBody';

type WorkoutDialogLayoutProps = PropsWithChildren<{
  workoutDate: Date;
  onOpenChange: (open: boolean) => void;
}>;

export const WorkoutDialogLayout: FC<WorkoutDialogLayoutProps> = (props: WorkoutDialogLayoutProps) => {
  const router = useRouter();

  const handleAccept = async () => {
    const workoutDate = toDateOnly(props.workoutDate);
    router.push(`workout/${workoutDate}`);
  };

  return (
    <DialogContent className={'flex flex-col max-h-[80vh] w-full md:max-h-[80vh] md:w-[600px]'}>
      <DialogHeader>
        <DialogTitle className={'text-primary text-xl md:text-3xl text-left'}>
          {props.workoutDate.toLocaleDateString('pl-PL', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          <DialogDescription className={'mb-0 mt-1 text-left'}>Ćwiczenia wykonane podczas treningu:</DialogDescription>
        </DialogTitle>
      </DialogHeader>
      {props.children}
      <DialogFooter>
        <Button variant={'ghost'} onClick={() => props.onOpenChange(false)}>
          Anuluj
        </Button>
        <Button onClick={handleAccept}>Przejdź</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export type WorkoutDialogProps = {
  workout?: TBrowseWorkout;
  onOpenChange: (open: boolean) => void;
};

export const WorkoutDialog = ({ workout, ...props }: WorkoutDialogProps) => {
  let dialogContent = null;

  if (workout) {
    let dialogBody;

    if (workout.id) {
      dialogBody = (
        // <Suspense fallback={<Loader />}>
        <WorkoutDialogBody workout={workout} />
        // </Suspense>
      );
    } else {
      dialogBody = <p>W tym dniu nie dodano żadnego ćwiczenia.</p>;
    }

    dialogContent = (
      <WorkoutDialogLayout {...props} workoutDate={workout.date}>
        {dialogBody}
      </WorkoutDialogLayout>
    );
  }

  return (
    <Dialog open={!!workout} onOpenChange={props.onOpenChange}>
      {dialogContent}
    </Dialog>
  );
};
