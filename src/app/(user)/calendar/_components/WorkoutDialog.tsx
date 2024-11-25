import { PropsWithChildren, useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@components/ui';
import { useRouter } from 'next/navigation';
import { getWorkoutByDate } from '@features/workouts/actions';
import { TBrowseWorkout } from '@features/workouts/types/workout/browse-workout.type';
import { TWorkout, TWorkoutExercise } from '@features/workouts/types';
import { WorkoutSchema } from '@features/workouts/schemas';
import { toDateOnly } from '@/utils/date';
import { Loader } from '@components/Loader';

type WorkoutDialogBaseProps = {
  workoutDate: Date;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
} & PropsWithChildren;

const WorkoutDialogLayout = (props: WorkoutDialogBaseProps) => {
  const router = useRouter();

  const handleAccept = async () => {
    const workoutDate = toDateOnly(props.workoutDate);
    router.push(`workout/${workoutDate}`);
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className={'flex flex-col max-h-[80vh] w-full md:max-h-[80vh] md:w-[600px]'}>
        <DialogHeader>
          <DialogTitle className={'text-primary text-xl md:text-3xl'}>
            {props.workoutDate.toLocaleDateString('pl-PL', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
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
    </Dialog>
  );
};

type WorkoutDialogProps = {
  workout: TBrowseWorkout;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const WorkoutDialogBody = ({ workout, ...props }: WorkoutDialogProps) => {
  const [workoutFromApi, setWorkoutFromApi] = useState<TWorkout>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchWorkout = async (): Promise<void> => {
      setIsLoading(true);
      getWorkoutByDate(new Date(workout.date))
        .then((response) => response.json())
        .then((data) => {
          const parsedData = WorkoutSchema.parse(data);
          setWorkoutFromApi(parsedData);
        })
        .finally(() => setIsLoading(false));
    };

    fetchWorkout();
  }, [workout]);

  return (
    <WorkoutDialogLayout {...props} workoutDate={workout?.date}>
      <Loader isLoading={isLoading} />
      <ul>
        {workoutFromApi?.exercises.map((exercise: TWorkoutExercise) => (
          <li key={exercise.id} className={'marker:text-primary'}>
            {exercise.name}
          </li>
        ))}
      </ul>
    </WorkoutDialogLayout>
  );
};

const WorkoutDialog = ({ workout, ...props }: WorkoutDialogProps) => {
  if (!workout) return null;

  if (!workout.id) {
    return (
      <WorkoutDialogLayout {...props} workoutDate={workout?.date}>
        <p>W tym dniu nie dodano żadnego ćwiczenia.</p>
      </WorkoutDialogLayout>
    );
  }

  return <WorkoutDialogBody {...props} workout={workout} />;
};

export default WorkoutDialog;
