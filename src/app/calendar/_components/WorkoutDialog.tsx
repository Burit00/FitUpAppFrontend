import { PropsWithChildren, useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { getWorkoutByDate } from '@features/workouts/actions';
import { TBrowseWorkout } from '@features/workouts/types/workout/browse-workout.type';
import { TWorkout, TWorkoutExercise } from '@features/workouts/types';
import { WorkoutSchema } from '@features/workouts/schemas';
import { toDateOnly } from '@/utils/date';

type WorkoutDialogBaseProps = {
  workoutDate: Date;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => Promise<void>;
} & PropsWithChildren;

const WorkoutDialogLayout = (props: WorkoutDialogBaseProps) => {
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
          <Button onClick={props.onAccept}>Przejdź</Button>
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
  const router = useRouter();
  const [workoutFromApi, setWorkoutFromApi] = useState<TWorkout>(null);

  useEffect(() => {
    const fetchWorkout = async (): Promise<void> => {
      const response = await getWorkoutByDate(new Date(workout.date));
      if (!response.ok) return;

      const data = await response.json();
      const parsedData = WorkoutSchema.parse(data);
      setWorkoutFromApi(parsedData);
    };

    fetchWorkout();
  }, [workout]);

  const handleAccept = async () => {
    const workoutDate = toDateOnly(workout.date);

    router.push(`workout/${workoutDate}`);
  };

  const isWorkoutExist = !!workout.id;

  if (!isWorkoutExist)
    return (
      <WorkoutDialogLayout {...props} onAccept={handleAccept} workoutDate={workout.date}>
        <p>W tym dniu nie dodano żadnego ćwiczenia.</p>
      </WorkoutDialogLayout>
    );

  return (
    <WorkoutDialogLayout {...props} onAccept={handleAccept} workoutDate={workout.date}>
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

  return <WorkoutDialogBody {...props} workout={workout} />;
};

export default WorkoutDialog;
