import { TBrowseWorkout, TWorkout, TWorkoutExercise } from '@features/workouts/types';
import { useEffect, useState } from 'react';
import { getWorkoutByDate } from '@features/workouts/actions';
import { WorkoutSchema } from '@features/workouts/schemas';
import { Loader } from '@components/Loader';

export type WorkoutDialogBodyProps = {
  workout: TBrowseWorkout;
};

export const WorkoutDialogBody = ({ workout }: WorkoutDialogBodyProps) => {
  const [workoutFromApi, setWorkoutFromApi] = useState<TWorkout | null>(null);
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
    <div className={'w-full min-h-10 relative overflow-hidden'}>
      <Loader isLoading={isLoading} />
      <ul>
        {workoutFromApi?.exercises.map((exercise: TWorkoutExercise) => (
          <li key={exercise.id} className={'marker:text-primary'}>
            {exercise.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
