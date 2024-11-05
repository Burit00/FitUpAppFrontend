import React, { PropsWithChildren } from 'react';
import { Button, Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { TWorkout } from '@/api/types/workouts/workout.type';
import { TWorkoutExercise } from '@/api/types/workouts/workout-exercise.type';

type WorkoutDialogBaseProps = {
  workoutDate: Date;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => Promise<void>;
} & PropsWithChildren;

const WorkoutDialogBase = (props: WorkoutDialogBaseProps) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className={'flex flex-col max-h-[80vh] w-full md:max-h-[80vh] md:w-[600px]'}>
        <DialogHeader>
          <DialogTitle className={'text-primary text-xl md:text-3xl'}>
            {new Date(props.workoutDate).toLocaleDateString('pl-PL', {
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
  workout: TWorkout;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const WorkoutDialog = ({ workout, ...props }: WorkoutDialogProps) => {
  const router = useRouter();

  const isWorkoutExist = workout && workout.id;

  const handleAccept = async () => {
    if (isWorkoutExist) {
      router.push(`workout/${workout.id}`);

      return;
    }

    router.push(`workout?date=${workout.date.toISOString()}`);
  };

  return (
    <WorkoutDialogBase {...props} onAccept={handleAccept} workoutDate={workout.date}>
      {isWorkoutExist ? (
        workout.exercises.map((exercise: TWorkoutExercise) => <p key={exercise.id}>{exercise.name}</p>)
      ) : (
        <p>W tym dniu nie dodano żadnego ćwiczenia.</p>
      )}
    </WorkoutDialogBase>
  );
};

export default WorkoutDialog;
