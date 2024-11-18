import { FC } from 'react';
import { MEASURES_MAP } from '@features/workouts/maps/measures.map';
import { TWorkoutSet } from '@features/workouts/types';
import { cn } from '@/utils';

type WorkoutSetProps = {
  set: TWorkoutSet;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

export const WorkoutSet: FC<WorkoutSetProps> = (props: WorkoutSetProps) => {
  if (!props.set) return null;

  return (
    <div
      onClick={props.onClick}
      className={cn(
        'flex flex-wrap justify-between gap-4 rounded px-4 py-2 bg-background border-primary border-[1px] border-solid relative',
        props.onClick && 'cursor-pointer, [transition:background_0.3s] hover:bg-primary/15',
        props.isActive && 'bg-primary/30  hover:bg-primary/25',
        props.className,
      )}
    >
      {props.set.parameters.map((parameter, index) => (
        <>
          <span key={parameter.id}>
            {parameter.value.toString()}
            {MEASURES_MAP.get(parameter.name)}
          </span>
          {props.set.parameters.length - 1 !== index && (
            <span key={props.set.parameters.length + index} className={'text-muted-foreground'}>
              x
            </span>
          )}
        </>
      ))}
    </div>
  );
};
