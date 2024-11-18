import { PageBar } from '@/components/PageBar';
import { AddWorkoutExerciseSheet } from '@/app/workout/[date]/_components/AddWorkoutExerciseSheet';

type WorkoutBarProps = {
  date: Date;
  onAddNewExercise?: (exerciseId: string) => void;
};

export const WorkoutBar = (props: WorkoutBarProps) => {
  let weekday = props.date.toLocaleDateString('pl-PL', { weekday: 'short' });
  weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1).replace('.', ', ');

  const dateString =
    weekday +
    props.date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <PageBar
      centerSlot={<span className={'text-xl text-primary'}>{dateString}</span>}
      rightSlot={<AddWorkoutExerciseSheet className={'hidden md:flex'} onAddNewExercise={props.onAddNewExercise} />}
    />
  );
};
