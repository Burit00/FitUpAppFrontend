'use client';

import { FC, useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@components/ui/sheet';
import { Button, Input } from '@components/ui';
import { TExercise } from '@features/workouts/types';
import { getExercises } from '@features/workouts/actions';
import { useExerciseCategories } from '@/app/workout/[date]/_hooks/useExerciseCategories';
import { ExerciseCategoriesSelect } from '@/app/workout/[date]/_components/ExerciseCategoriesSelect';
import { useDebounceState } from '@/hooks/useDebounceState';
import { FaPlus } from 'react-icons/fa6';

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
          {/* hard height value enforce scroll on element*/}
          <div className={'w-full flex-grow h-0 overflow-auto'}>
            {exercises.map((exercise) => (
              <p
                key={exercise.id}
                className={
                  'flex flex-wrap items-center gap-1 transition duration-300 bg-background2/20 hover:bg-background2 px-3 py-2 rounded cursor-pointer text-wrap'
                }
                onClick={() => {
                  props.onAddNewExercise(exercise.id);
                }}
              >
                <FaPlus className={'text-primary'} />
                {exercise.name.split(' ').map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
