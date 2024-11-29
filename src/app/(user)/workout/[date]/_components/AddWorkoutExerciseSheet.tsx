'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@components/ui/sheet';
import { Button, Input } from '@components/ui';
import { TExercise, TWorkoutExercise } from '@features/workouts/types';
import { getExercises } from '@features/workouts/actions';
import { useExerciseCategories } from '@/app/(user)/workout/[date]/_hooks/useExerciseCategories';
import { ExerciseCategoriesSelect } from '@/app/(user)/workout/[date]/_components/ExerciseCategoriesSelect';
import { useDebounceState } from '@/hooks/useDebounceState';
import { ExerciseRow } from '@/app/(user)/workout/[date]/_components/ExerciseRow';
import { Loader } from '@components/Loader';

type AddWorkoutExerciseButtonProps<> = {
  exercisesToFilter?: TWorkoutExercise[];
  className?: string;
  onAddNewExercise: (exerciseId: string) => void;
};

export const AddWorkoutExerciseSheet: FC<AddWorkoutExerciseButtonProps> = (props) => {
  const [exerciseSearch, setExerciseSearch] = useDebounceState('');
  const { selectedCategoryId, categories, setCategorySearch, handleSelectCategory } = useExerciseCategories();
  const [exercisesFromApi, setExercisesFromApi] = useState<TExercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const exercises: TExercise[] = useMemo(() => {
    if (!props.exercisesToFilter) return exercisesFromApi;

    return exercisesFromApi.filter(
      (exercise) => !props.exercisesToFilter?.some((exerciseToFilter) => exercise.name === exerciseToFilter.name),
    );
  }, [exercisesFromApi, props.exercisesToFilter]);

  useEffect(() => {
    const getExercisesFromApi = async (params: { search?: string; categoryId?: string }): Promise<void> => {
      setIsLoading(true);
      const response = await getExercises(params);
      setIsLoading(false);

      if (!response.ok) return;

      const data = await response.json();
      setExercisesFromApi(data);
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
            <Loader isLoading={isLoading} />
            {exercises.length === 0 && <p>Nie znaleziono ćwiczeń spełniających podane kryteria.</p>}
            {exercises.map((exercise) => (
              <ExerciseRow
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
