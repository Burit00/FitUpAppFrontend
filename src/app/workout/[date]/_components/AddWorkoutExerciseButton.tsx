'use client';

import { FC, useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@components/ui/sheet';
import { Button, Input } from '@components/ui';
import { TExercise } from '@features/workouts/types';
import { getExercises } from '@features/workouts/actions/queries/get-exercises';
import { useExerciseCategories } from '@/app/workout/[date]/_hooks/useExerciseCategories';
import { ExerciseCategoriesSelect } from '@/app/workout/[date]/_components/ExerciseCategoriesSelect';
import { useDebounceState } from '@/hooks/useDebounceState';

type AddWorkoutExerciseButtonProps<> = {
  className?: string;
  onAddNewExercise: (exerciseId: string) => void;
};

export const AddWorkoutExerciseButton: FC<AddWorkoutExerciseButtonProps> = (props) => {
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

    getExercisesFromApi({ search: exerciseSearch, categoryId: selectedCategoryId });
  }, [exerciseSearch, selectedCategoryId]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={props.className}>Dodaj ćwiczenie</Button>
      </SheetTrigger>
      <SheetContent className={'border-l-2 border-solid border-l-primary'}>
        <SheetHeader>
          <SheetTitle>Dodaj Ćwiczenie</SheetTitle>
        </SheetHeader>
        <div className={'flex flex-col gap-4'}>
          <Input onChange={(e) => setExerciseSearch(e.target.value)} />
          <ExerciseCategoriesSelect
            categories={categories}
            onChange={setCategorySearch}
            onCategorySelect={handleSelectCategory}
          />
          {exercises.map((exercise) => (
            <p
              key={exercise.id}
              className={'transition hover:bg-background2'}
              onClick={() => {
                props.onAddNewExercise(exercise.id);
              }}
            >
              {exercise.name}
            </p>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
