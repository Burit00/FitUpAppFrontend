import React, { FC } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { TExercise } from '@features/workouts/types';

type WorkoutExerciseRowProps = {
  exercise: TExercise;
  onClick?: () => void;
};

export const WorkoutExerciseRow: FC<WorkoutExerciseRowProps> = ({ exercise, ...props }: WorkoutExerciseRowProps) => {
  return (
    <div
      tabIndex={0}
      className={
        'flex flex-wrap items-center gap-1 transition duration-300 bg-background2/20 hover:bg-background2 px-3 py-2 rounded cursor-pointer text-wrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      }
      onClick={props.onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          props?.onClick();
        }
      }}
    >
      <FaPlus className={'text-primary'} />
      {exercise.name.split(' ').map((word) => (
        <span key={word}>{word}</span>
      ))}
    </div>
  );
};
