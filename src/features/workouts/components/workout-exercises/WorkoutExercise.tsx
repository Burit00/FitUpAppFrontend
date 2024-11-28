import React, { FC } from 'react';
import { TWorkoutExercise, TWorkoutSet } from '@features/workouts/types';
import { WorkoutSet } from '@features/workouts/components/workout-sets/WorkoutSet';
import DeleteWorkoutExerciseButton from '@features/workouts/components/workout-exercises/DeleteWorkoutExerciseButton';

type WorkoutSetProps = {
  workoutExercise: TWorkoutExercise;
  onExerciseClick: (exercise: TWorkoutExercise) => void;
  onExerciseDelete: (exerciseId: string) => void;
};

export const WorkoutExercise: FC<WorkoutSetProps> = ({ workoutExercise, ...props }: WorkoutSetProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    props.onExerciseClick(workoutExercise);
  };

  return (
    <div
      className={
        'bg-background2/40 hover:bg-background2/80 focus-visible:bg-background2/80 [transition:background_0.3s] p-4 rounded flex flex-col gap-2 cursor-pointer w-full'
      }
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          props.onExerciseClick(workoutExercise);
        }
      }}
      onClick={handleClick}
    >
      <div className={'flex justify-between items-center'}>
        <h3 className={'w-[90%]'}>
          {workoutExercise.name} <span className={'text-muted-foreground text-wrap'}>({workoutExercise.category})</span>
        </h3>
        <div className={'h-full flex flex-col'} onClick={(e) => e.preventDefault()}>
          <DeleteWorkoutExerciseButton
            workoutExercise={workoutExercise}
            onDelete={() => props.onExerciseDelete(workoutExercise.id)}
          />
        </div>
      </div>
      <div className={'flex flex-row flex-wrap gap-2'}>
        {workoutExercise.sets.length === 0 && <p>Nie dodano żadnej serii do tego ćwiczenia.</p>}
        {workoutExercise.sets.map((set: TWorkoutSet) => (
          <WorkoutSet key={set.id} set={set} />
        ))}
      </div>
    </div>
  );
};
