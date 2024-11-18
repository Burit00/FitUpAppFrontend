'use client';

import { FC, useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@components/ui/sheet';
import { Button, Input } from '@components/ui';
import { TExercise } from '@features/workouts/types';
import { getExercises } from '@features/workouts/actions';
import { useExerciseCategories } from '@/app/workout/[date]/_hooks/useExerciseCategories';
import { ExerciseCategoriesSelect } from '@/app/workout/[date]/_components/ExerciseCategoriesSelect';
import { useDebounceState } from '@/hooks/useDebounceState';
import { WorkoutExerciseRow } from '@/app/workout/[date]/_components/WorkoutExerciseRow';

type AddWorkoutExerciseButtonProps<> = {
  className?: string;
  onAddNewExercise: (exerciseId: string) => void;
};

export const AddWorkoutExerciseSheet: FC<AddWorkoutExerciseButtonProps> = (props) => {
  const [exerciseSearch, setExerciseSearch] = useDebounceState('');
  const { selectedCategoryId, categories, setCategorySearch, handleSelectCategory } = useExerciseCategories();
  const [exercises, setExercises] = useState<TExercise[]>([]);

  useEffect(() => {
    const getExercisesFromApi = async (params: { search?: string; categoryId?: string }): Promise<void> => {
      const response = await getExercises(params);

      if (!response.ok) return;

      const data = await response.json();
      setExercises(data);
    };
    const categoryId = selectedCategoryId !== 'all' ? selectedCategoryId : '';
    getExercisesFromApi({ search: exerciseSearch, categoryId });
  }, [exerciseSearch, selectedCategoryId]);

  return (
    <Sheet
      onOpenChange={(open) => {
        if (open) return;
        setExerciseSearch('');
        handleSelectCategory('all');
      }}
    >
      <SheetTrigger asChild>
        <Button className={props.className}>Dodaj ćwiczenie</Button>
      </SheetTrigger>
      <SheetContent className={'flex flex-col'}>
        <SheetHeader>
          <SheetTitle>Dodaj Ćwiczenie</SheetTitle>
        </SheetHeader>
        <div className={'flex flex-col gap-4 flex-grow'}>
          <Input label={'Nazwa ćwiczenia'} placeholder={'Szukaj'} onChange={(e) => setExerciseSearch(e.target.value)} />
          <ExerciseCategoriesSelect
            categories={categories}
            onChange={setCategorySearch}
            onCategorySelect={handleSelectCategory}
          />
          {/* hard height value enforce show scroll on element*/}
          <div className={'w-full flex-grow h-0 overflow-auto flex flex-col gap-2 p-1'}>
            {exercises.map((exercise) => (
              <WorkoutExerciseRow
                key={exercise.id}
                exercise={exercise}
                onClick={() => {
                  props.onAddNewExercise(exercise.id);
                }}
              />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
