import { TWorkout, TWorkoutExercise } from '@features/workouts/types';
import { FC, useEffect, useState } from 'react';
import SortableList from '@components/D&D/Sortable/SortableList';
import { WorkoutExercise } from '@features/workouts/components';
import { updateWorkoutExerciseOrderIndex } from '@features/workouts/actions/commands/workout-exercises/update-workout-exercise-order-index.http';
import { CSS } from '@dnd-kit/utilities';

type WorkoutDetailsProps = {
  workout: TWorkout;
  onRequestRefresh: () => Promise<void>;
  onExerciseClick: (workoutExercise: TWorkoutExercise) => void;
  onExerciseDelete: (workoutExerciseId: string) => void;
};

export const WorkoutDetails: FC<WorkoutDetailsProps> = ({ workout, ...props }) => {
  const [exercises, setExercises] = useState<TWorkoutExercise[]>(workout?.exercises ?? []);

  useEffect(() => {
    if (workout) setExercises(workout.exercises);
  }, [workout, workout?.exercises]);

  const handleOrderChange = async ({ active, over }: { active: TWorkoutExercise; over: TWorkoutExercise }) => {
    await updateWorkoutExerciseOrderIndex(active.id, over.id);
    props.onRequestRefresh();
  };

  if (!workout || workout?.exercises.length === 0)
    return <h2 className={'text-muted text-center'}>W tym dniu nie dodano żadnego ćwiczenia.</h2>;

  return (
    <div className={'flex flex-col w-full gap-4'}>
      <SortableList
        items={exercises}
        onChange={setExercises}
        onOrderChange={handleOrderChange}
        renderItem={(exercise: TWorkoutExercise, sortable) => {
          const { setNodeRef, isDragging, transform, transition } = sortable;

          const style = {
            transform: CSS.Translate.toString(transform),
            transition,
            opacity: isDragging ? 0 : 1,
          };

          return (
            <div ref={setNodeRef} style={style} className={'flex gap-2 bg-background overflow-hidden rounded'}>
              <SortableList.DragHandle className={'h-[calc-size(100%)] p-1 bg-background2/40 transition-colors'} />
              <WorkoutExercise
                workoutExercise={exercise}
                onExerciseClick={props.onExerciseClick}
                onExerciseDelete={props.onExerciseDelete}
              />
            </div>
          );
        }}
      />
    </div>
  );
};
