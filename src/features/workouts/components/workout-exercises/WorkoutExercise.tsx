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
        'bg-background2/40 hover:bg-background2/80 [transition:background_0.3s] p-4 rounded flex flex-col gap-2 cursor-pointer relative'
      }
      onClick={handleClick}
    >
      <div className={'flex justify-between items-center'}>
        <h4 className={'w-[90%]'}>{workoutExercise.name}</h4>
        <DeleteWorkoutExerciseButton
          workoutExercise={workoutExercise}
          onDelete={() => props.onExerciseDelete(workoutExercise.id)}
        />
      </div>
      <div className={'flex flex-col sm:flex-row flex-wrap gap-2'}>
        {workoutExercise?.sets.map((set: TWorkoutSet) => <WorkoutSet key={set.id} set={set} />)}
      </div>
    </div>
  );
};
