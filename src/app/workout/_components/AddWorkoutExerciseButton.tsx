'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui';
import { TExercise } from '@/api/types/workouts/exercise.type';

export const AddWorkoutExerciseButton = () => {
  const exercises: TExercise[] = [];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={'w-full lg:w-1/4'}>Dodaj ćwiczenie</Button>
      </SheetTrigger>
      <SheetContent side={'right'} className={'border-l-primary border-l-2'}>
        <SheetHeader>
          <SheetTitle>Dodaj Ćwiczenie</SheetTitle>
        </SheetHeader>
        <div className={'flex flex-col gap-4'}>
          {exercises.map((exercise) => (
            <p key={exercise.id}>{exercise.name}</p>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
