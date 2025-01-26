import { useEffect, useState, useTransition } from 'react';
import { TExerciseCategory } from '@features/workouts/types';
import { useDebounceState } from '@/hooks/useDebounceState';
import { getExerciseCategories } from '@features/workouts/actions/queries/get-exercise-categories.http';

export function useExerciseCategories() {
  const [categorySearch, setCategorySearch] = useDebounceState<string>('');
  const [categories, setCategories] = useState<TExerciseCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [_, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const response = await getExerciseCategories(categorySearch);

      if (!response.ok) return;

      const data = await response.json();
      setCategories(data);
    });
  }, [categorySearch]);

  return {
    categories,
    selectedCategoryId,
    handleSelectCategory: setSelectedCategoryId,
    setCategorySearch,
  };
}
