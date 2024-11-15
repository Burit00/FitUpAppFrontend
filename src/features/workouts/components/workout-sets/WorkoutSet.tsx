import { FC } from 'react';
import { MEASURES_MAP } from '@features/workouts/maps/measures.map';
import { TSetParameterNameWithValue, TWorkoutSet } from '@features/workouts/types';
import { cn } from '@/utils';

type WorkoutSetProps = {
  set: TWorkoutSet;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

export const WorkoutSet: FC<WorkoutSetProps> = (props: WorkoutSetProps) => {
  if (!props.set) return null;

  const WorkoutSetDetails: React.ReactNode[] = [];

  props.set.parameters.forEach((parameter: TSetParameterNameWithValue, index: number): void => {
    switch (parameter.name) {
      case 'time':
        const time = parameter.value;
        WorkoutSetDetails.push(<span key={parameter.id}>{time.toString()}</span>);
        break;

      default:
        WorkoutSetDetails.push(
          <span key={parameter.id}>
            {parameter.value.toString()}
            {MEASURES_MAP.get(parameter.name)}
          </span>,
        );
    }
    if (props.set.parameters.length - 1 !== index) {
      WorkoutSetDetails.push(
        <span key={props.set.parameters.length + index} className={'text-muted-foreground'}>
          x
        </span>,
      );
    }
  });

  return (
    <div
      onClick={props.onClick}
      className={cn(
        'flex flex-wrap justify-between gap-4 rounded px-4 py-2 bg-background/20 border-primary border-[1px] border-solid',
        props.onClick && 'cursor-pointer, [transition:background_0.3s]',
        props.isActive && 'bg-primary text-primary-foreground',
        props.className,
      )}
    >
      {WorkoutSetDetails}
    </div>
  );
};
